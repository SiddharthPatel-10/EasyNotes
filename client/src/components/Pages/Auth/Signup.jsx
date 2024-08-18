import signupImg from "../../../assets/Images/signup.webp";
import Template from "../../../components/core/Auth/Template";

function Signup() {
  return (
    <Template
      title="Join the best Ecommerce platform"
      description1="Discover a wide range of products."
      description2="Experience seamless online shopping."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
