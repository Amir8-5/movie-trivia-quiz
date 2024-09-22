import "../index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  //Formik logic management
  const formik = useFormik({
    initialValues: {
      username: "",
      includeYear: "",
      includeRuntime: "",
      includeimdbRating: "",
      includeBoxoffice: "",
      difficulty: "choose",
    },

    //form validation
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("username required"),
      includeYear: Yup.boolean(),
      includeRuntime: Yup.boolean(),
      includeimdbRating: Yup.boolean(),
      includeBoxoffice: Yup.boolean(),
      difficulty: Yup.string()
        .oneOf(["easy", "medium", "hard"])
        .required("Required"),
    }),

    //Form submission
    onSubmit: (values) => {
      navigate('Movie-Search', {state : {formValues: values}})
    },
  });

  console.log(formik.errors);
  const uncheckedBoxStyle =
    "text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
  const checkedBoxStyle =
    "text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-200 dark:focus:ring-blue-400 dark:ring-offset-gray-600 focus:ring-1 dark:bg-gray-700 dark:border-gray-400";

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <form
        className="w-9/12 flex bg-lavender rounded-lg lato-regular"
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
              className={`lato-bold block capitalize mb-2 ${formik.errors.username && formik.touched.username? "text-red-500" : ""}`}
            >
              {formik.errors.username && formik.touched.username? formik.errors.username : "username"}
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              autoComplete="off"
              className="w-1/2 border-2 border-gray-500 rounded-md focus:ring-0 focus:border-cyan-400 "
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex justify-start items-center gap-3 pb-4">
            <label htmlFor="includeYear" className="lato-bold block capitalize">
              include year
            </label>
            <input
              type="checkbox"
              name="includeYear"
              className={
                formik.values.includeYear ? checkedBoxStyle : uncheckedBoxStyle
              }
              value={formik.values.includeYear}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex justify-start items-center gap-3 pb-4">
            <label htmlFor="includeRuntime" className="lato-bold block capitalize">
              include runtime
            </label>
            <input
              type="checkbox"
              name="includeRuntime"
              className={
                formik.values.includeRuntime
                  ? checkedBoxStyle
                  : uncheckedBoxStyle
              }
              value={formik.values.includeRuntime}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex justify-start items-center gap-3 pb-4">
            <label htmlFor="includeImdbRating" className="lato-bold block capitalize">
              include imdb
            </label>
            <input
              type="checkbox"
              name="includeimdbRating"
              className={
                formik.values.includeimdbRating ? checkedBoxStyle : uncheckedBoxStyle
              }
              value={formik.values.includeimdbRating}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex justify-start items-center gap-3 pb-4">
            <label htmlFor="includeBoxOffice" className="lato-bold block capitalize">
              include box office
            </label>
            <input
              type="checkbox"
              name="includeBoxoffice"
              className={
                formik.values.includeBoxoffice
                  ? checkedBoxStyle
                  : uncheckedBoxStyle
              }
              value={formik.values.includeBoxoffice}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex justify-start items-center gap-3 pb-4">
            <label htmlFor="includeDirector" className="lato-bold block capitalize">
              include director
            </label>
            <input
              type="checkbox"
              name="includeDirector"
              className={
                formik.values.includeDirector
                  ? checkedBoxStyle
                  : uncheckedBoxStyle
              }
              value={formik.values.includeDirector}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="difficulty"
              className="lato-bold block capitalize mb-2"
            >
              <h1>choose difficulty</h1>
              <p className="text-sm text-gray-500">
                the difficulty determines how accurate your answer has to be
              </p>
            </label>
            <select
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              id="difficulty"
              className="block w-full p-2 mb-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="choose">Choose a difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            type="submit"
            className="capitalize w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            submit
          </button>
        </div>
        <div className="flex-1 w-2/3 rounded-lg">
          <img
            src="https://www.marthastewart.com/thmb/g-FunKfdiZombJQ7pB4wb8BF4C8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cat-kitten-138468381-4cd82b91d7be45cb9f9aa8366e10bce4.jpg"
            className="w-full h-full object-cover aspect-auto rounded-lg"
          />
        </div>
      </form>
    </main>
  );
}
