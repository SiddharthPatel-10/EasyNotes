import frameImg from "../../../assets/Images/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function Template({ title, description1, description2, image, formType }) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-100">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 bg-white shadow-lg rounded-lg p-6">
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-800">
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-gray-600">
            <span>{description1}</span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-600">
              {description2}
            </span>
          </p>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
            className="rounded-lg shadow-md"
          />
          <img
            src={image}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Template;
