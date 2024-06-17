import Auth from "../components/Auth_signin";
import { Quote } from "../components/Quote";

export default function Signin() {
  return (
    <div className="grid grid-cols-2">
      <Auth/>
      <Quote/>
    </div>
  )
}
