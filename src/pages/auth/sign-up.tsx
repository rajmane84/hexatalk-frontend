import SignUpForm from "../../components/signup-form";

const SignUp = () => {
   return (
     <div className="flex min-h-screen items-center justify-center">
       <div className="w-full max-w-md space-y-8 px-6">
         <div className="space-y-4 text-center">
           <div className="flex justify-center">
             <div className="relative">
               <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-600 opacity-50 blur-2xl"></div>
               <img
                 alt="hexatalk-logo"
                 src={"/hexatalk-logo.svg"}
                 height={100}
                 width={100}
                 className="z-10 size-24"
               />
             </div>
           </div>

           <div className="space-y-2">
             <h1 className="text-4xl font-bold text-neutral-300">HexaTalk</h1>
             <p className="text-neutral-500/75">
               Send and Receive messages without keeping your phone online.
             </p>
           </div>
         </div>

         <SignUpForm />

         <div className="text-center">
           <p className="text-sm text-neutral-500/75">
             Already have an account?{" "}
             <a
               href="/sign-in"
               className="hover:text-puple-500/90 font-medium text-purple-500 transition-colors"
             >
               Sign In
             </a>
           </p>
         </div>
       </div>
     </div>
   );
}

export default SignUp
