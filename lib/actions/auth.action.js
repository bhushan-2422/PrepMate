"use server";

//in this project we are geting sign in credentilas on the client side
// and checking it on the server side i.e authentication
//we can do it completely on either side
//but by this way our web remains more secure

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params) {
  const { uid, name, email } = params;

  try {
    //fetch the user record
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exist.Please sign in",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created succesfuly! Please Sign In",
    };
  } catch (e) {
    console.error(e);
    if (e.code === "auth/email-already-exist") {
      return {
        success: false,
        message: "This email already in use!",
      };
    }

    return {
      success: false,
      message: "Failed to create an account!",
    };
  }
}

export async function signIn(params) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account",
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Failed to log into account",
    };
  }
}

export async function setSessionCookie(idToken) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}


export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }
    return {
      ...userRecord.data(),
      id: userRecord.id,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user; //true or false
}

export async function getInterviewByUserId(userId) {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("created_on", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getLatestInterviews(params) {
  const {userId, limit =20} = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("created_on", "desc")
    .where('finalized', '==', true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getInterviewById(interviewId) {
  const docRef = db.collection("interviews").doc(interviewId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      created_on: data.created_on?.toDate().toISOString() || null, // <-- convert here
    };
  } else {
    return null;
  }
}


export async function getFeedbackByInterviewId(params) {
  const {interview_id, userId} = params;

  const feedback = await db
    .collection("interviewFeedback")
    .where('interview_id','==', interview_id)
    .where("userId", "==", userId)
    .limit(1)
    .get();

    if(feedback.empty) return null;
    const feedbackDoc = feedback.docs[0];

  return {
    id: feedbackDoc.id, ...feedbackDoc.data()
  }
}
