import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { IMessage } from "../@types/productType";
import { sendMessage } from "../services/message-service";
import patterns from "../validation/patterns";

const Contact = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IMessage>({
        defaultValues: { fullName: "", email: "", message: "" },
        mode: "onChange",
    });


    const onSend = (data: IMessage) => {
        console.log("Send data:", data);
        sendMessage(data)
            .then(() => {
                dialogs.success("Message Sent", "Your message has been sent successfully.");
                navigate("/");
            })
            .catch((error) => {
                dialogs.error("Message Error", error.response.data);
            });
    }


    return (
        <div className="create-card-container bg-blue-950 text-white dark:bg-slate-600">
            <form noValidate onSubmit={handleSubmit(onSend)}>
                {/* Full Name */}
                <section>
                    <input
                        placeholder="Full Name"
                        type="text"
                        {...register("fullName", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.fullName && (
                        <p className="text-red-500">{errors.fullName?.message}</p>
                    )}
                </section>

                {/* Email */}
                <section>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.email,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email?.message}</p>
                    )}
                </section>

                {/* Message */}
                <section>
                    <textarea
                        placeholder="Message"
                        {...register("message", {
                            required: "This field is mandatory",
                            minLength: { value: 5, message: "Too short" },
                            maxLength: { value: 500, message: "Too long" },
                        })}
                    />
                    {errors.message && (
                        <p className="text-red-500">{errors.message?.message}</p>
                    )}
                </section>

                <button disabled={!isValid} type="submit">Send</button>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-300">Already have an account? </span>
                    <Link className="text-sm font-medium text-green-300 hover:underline" to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};


export default Contact;