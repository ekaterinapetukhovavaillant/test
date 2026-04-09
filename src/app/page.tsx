"use client";

import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, { error: "Username should contain 3 and more chars" }),
  password: z
    .string()
    .min(8, { error: "Password should contain 8 and more chars" })
    .max(20, { error: "Password should contain 20 and less chars" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name as keyof LoginSchema;
    const { value } = e.currentTarget;

    const result = loginSchema.shape[key].safeParse(value);

    if (result.success) {
      setSuccess(true);
    } else {
      setErrors((prev) => [...prev, ...result.error.issues.map((x) => x.message)]);
      setSuccess(false);
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setErrors([]);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const result = loginSchema.safeParse(data);

    if (result.success) {
      setSuccess(true);
    } else {
      setErrors((prev) => [...prev, ...result.error.issues.map((x) => x.message)]);
      setSuccess(false);
    }
  };

  const errorsBlock = errors.map((e) => <div>{e}</div>);

  return (
    <div className="m-2 max-w-sm">
      <form onSubmit={handleSubmit} name="form" method="POST">
        <div className="flex flex-col gap-y-4">
          <input key="bla" className="border" name="username" onChange={handleChange} />
          <input key="alb" className="border" name="password" type="password" onChange={handleChange} />
          <button type="submit">Submit</button>
        </div>
      </form>
      {success && <div>Success</div>}
      {errors && <div className="text-red-500 flex flex-col gap-y-1">{errorsBlock}</div>}
    </div>
  );
}

// "use client";
//
// import { z } from 'zod'
// import   React, { useState } from "react"
//
// export default function   Home( ) {
//
//   const [errors,setErrors] = useState<string[]>([])
//
//   const [success , setSuccess] = useState(false)
//
//   let loginSchema = z.object({
//     username: z.string().min(3,{ message: "Username should contain 3 and more chars"}),
//     password: z.string()
//       .min(8,{message:'Password should contain 8 and more chars'})
//       .max(20 , { message : "Password should contain 20 and less chars" })
//   })
//
//   const handleSubmit = ( e : React.FormEvent<HTMLFormElement> ) => {
//     e.preventDefault( )
//     setSuccess(false)
//     setErrors( [ ] )
//
//     const formData = new FormData( e.currentTarget as HTMLFormElement )
//     const data = Object.fromEntries( formData )
//
//     const result = loginSchema.safeParse( data )
//
//     if ( result.success ) {
//       setSuccess( true )
//     } else {
//       setErrors( result.error.issues.map(( i ) => { return i.message }) )
//       setSuccess(false )
//     }
//   }
//
//   const errorsBlock = errors.map((e)=>{
//     return ( <div>{ e }</div> )
//   })
//
//   return (
//     <div className = "m-2 max-w-sm" >
//       <form onSubmit = { handleSubmit } name = 'form' >
//         <div className= "flex flex-col gap-y-4" >
//
//           <input className = "border" name = "username"  />
//
//           <input className= "border" name="password" type = "password" ></input>
//
//           <button type = "submit" > Submit </button>
//
//         </div>
//       </form>
//
//       { success && ( <div> Success </div> ) }
//
//       { errors && <div className = "text-red-500 flex flex-col gap-y-1" >
//         { errorsBlock }
//       </div> }
//
//     </div>
//   )
// }
