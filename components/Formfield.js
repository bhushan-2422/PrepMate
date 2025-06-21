import React from "react";
import { Controller } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"; // Update path if needed

import { Input } from "@/components/ui/input"; // Update path if needed


const Formfield = ({ control, name, label, placeholder, type }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} className="input" type={type} {...field} />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Formfield;
