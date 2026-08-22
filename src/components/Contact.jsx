import React from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
     toast.success("Form Submitted Successfully")
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
      setResult("");
    }
  };

  return (
    <div className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden" id="contact">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Contact us
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
       For more information, please reach out to us using the form below. 
       We value your feedback and inquiries, and we will get back to you as soon as possible.
      </p>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto text-gray-600">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">
            Your Name
            <input className="w-full border border-gray-300 rounded py-3 px-4 mt-2" type="text" name="Name" placeholder="Your Name" required/>
          </div>
          <div className="w-full md:w-1/2 text-left">
            Your email
            <input className="w-full border border-gray-300 rounded py-3 px-4 mt-2" type="email" name="email" placeholder="Your email" required/>
          </div>
        </div>
        <div className="my-6 text-left">
          Message
          <textarea className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none" name="Message" placeholder="Message" required></textarea>
        </div>
        <button className="bg-blue-600 text-white py-2 px-12 mb-10 rounded">{result ? result : "Send Message"}</button>
      </form>
    </div>
  );
};

export default Contact;