import "../index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Reusable Checkbox component for a cleaner form structure
const Checkbox = ({ name, label, formik }) => (
  <div className="flex items-center gap-3 pb-4">
    <input
      type="checkbox"
      id={name}
      name={name}
      className="h-4 w-4 rounded border-gray-300 text-asparagus focus:ring-asparagus"
      checked={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <label htmlFor={name} className="lato-bold block capitalize">
      {label}
    </label>
  </div>
);

export default function Login() {
  const navigate = useNavigate();

  //Formik logic management
  const formik = useFormik({
    initialValues: {
      username: "",
      includeYear: false,
      includeRuntime: false,
      includeImdbRating: false,
      includeBoxOffice: false,
      includeDirector: false,
      difficulty: "choose",
    },

    //form validation
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Username is too short!")
        .max(50, "Username is too long!")
        .required("Username is required"),
      includeYear: Yup.boolean(),
      includeRuntime: Yup.boolean(),
      includeImdbRating: Yup.boolean(),
      includeBoxOffice: Yup.boolean(),
      includeDirector: Yup.boolean(),
      difficulty: Yup.string()
        .oneOf(["easy", "medium", "hard"], "Please select a difficulty.")
        .required("Required"),
    }),

    //Form submission
    onSubmit: (values) => {
      navigate("Movie-Search", { state: { formValues: values } });
    },
  });

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <form
        className="w-10/12 lg:w-9/12 flex bg-white rounded-lg lato-regular shadow-xl"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex-1 text-gray-700 p-20">
          <div className="pb-6">
            <h1 className="text-3xl pb-2 lato-bold">
              Welcome to the movie quiz!
            </h1>
            <p className="text-sm text-gray-500 ">
              Please enter your username and choose your preferred settings for
              the game
            </p>
          </div>
          <div className="pb-4">
            <label
              htmlFor="username"
              className={`lato-bold block capitalize mb-2 ${
                formik.touched.username && formik.errors.username
                  ? "text-red-500"
                  : ""
              }`}
            >
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : "username"}
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              autoComplete="off"
              className="w-full md:w-1/2 border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-asparagus focus:border-asparagus"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <Checkbox name="includeYear" label="Include Year" formik={formik} />
          <Checkbox
            name="includeRuntime"
            label="Include Runtime"
            formik={formik}
          />
          <Checkbox
            name="includeImdbRating"
            label="Include IMDB Rating"
            formik={formik}
          />
          <Checkbox
            name="includeBoxOffice"
            label="Include Box Office"
            formik={formik}
          />
          <Checkbox
            name="includeDirector"
            label="Include Director"
            formik={formik}
          />
          <div>
            <label
              htmlFor="difficulty"
              className={`lato-bold block capitalize mb-2 ${
                formik.touched.difficulty && formik.errors.difficulty
                  ? "text-red-500"
                  : ""
              }`}
            >
              <span className="text-base">
                {formik.touched.difficulty && formik.errors.difficulty
                  ? formik.errors.difficulty
                  : "Choose difficulty"}
              </span>
              <p className="text-sm text-gray-500">
                the difficulty determines how accurate your answer has to be
              </p>
            </label>
            <select
              name="difficulty"
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="difficulty"
              className="block w-full p-2 mb-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-asparagus focus:border-asparagus"
            >
              <option value="choose" disabled>
                Choose a difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            type="submit"
            className="capitalize w-full text-white bg-asparagus hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-asparagus/50 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            submit
          </button>
        </div>
        <div className="flex-1 w-2/3 rounded-r-lg hidden md:block">
          <img
            src="https://www.marthastewart.com/thmb/g-FunKfdiZombJQ7pB4wb8BF4C8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cat-kitten-138468381-4cd82b91d7be45cb9f9aa8366e10bce4.jpg"
            alt="A cute kitten"
            className="w-full h-full object-cover aspect-auto rounded-r-lg"
          />
        </div>
      </form>
    </main>
  );
}
