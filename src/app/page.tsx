"use client";

import Form from "next/form";
import { z } from "zod";
import { ChangeEvent, useRef } from "react";

export default function Home() {
  const input = useRef<HTMLInputElement>(null);

  const action = () => {
    console.log(input.current?.value);
  };

  const valueSchema = z.string().min(5);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (input.current) {
      input.current.value = valueSchema.parse(event.target.value);
    }
  };

  return (
    <Form action={action}>
      <input className="border" name="query" onChange={onChange} value={input.current?.value} ref={input} />
      <button type="submit">Submit</button>
    </Form>
  );
}
