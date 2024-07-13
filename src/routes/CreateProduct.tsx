import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { createNewProduct } from "../services/products";
import { useAuth } from "../hooks/useAuth";
import { IProduct } from "../@types/productType";
import patterns from "../validation/patterns";




const CreateProduct = () => {
    const { token } = useAuth(); // Get the token from the context
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();

    const onSubmit = async (data: IProduct) => {
        if (!token) {
            dialogs.error("Error", "No authentication token found.");
            return;
        }

        const colorArray = data.color.split(',').map((color) => color.trim());
        data.color = colorArray;

        const sizesArray = data.sizes.split(',').map((size) => parseInt(size.trim()));
        data.sizes = sizesArray;

        try {
            await createNewProduct(data);
            dialogs.success("Success", "Card Created Successfully").then(() => {
                navigate("/");
            });
        } catch (error: any) {
            console.log(data);
            dialogs.error("Error", error.response);
            console.log(error);
        }
    };


    return (
        <div className="create-card-container bg-blue-950  text-white dark:bg-slate-600">
            <h2>Create New Product</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* All form fields updated for card creation */}


                {/* productName */}
                <section>
                    <input placeholder="ProductName" {...register("productName", { required: "ProductName is required" })} />
                    {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
                </section>


                {/* subtitle */}
                <section>
                    <input placeholder="Subtitle" {...register("subtitle", { required: "Subtitle is required" })} />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </section>


                {/* description */}
                <section>
                    <input placeholder="ProductDescription" {...register("productDescription", { required: "ProductDescription is required" })} />
                    {errors.productDescription && <p className="text-red-500">{errors.productDescription.message}</p>}
                </section>


                {/* price */}
                <section>
                    <input placeholder="Price" type="number" step="0.01" {...register('price', { required: 'Price is required' })} />
                    <span className="error-message">{errors.price && errors.price.message}</span>
                </section>

                {/* color */}
                <section>
                    <input placeholder="Color" type="text[]" {...register('color', { required: "Color is required" })} />
                    {errors.color && <p className="text-red-500">{errors.color.message}</p>}
                </section>

                {/* image.url */}
                <section>
                    <input
                        placeholder="Image URL"
                        type="url"
                        {...register("image.url", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.url,
                                message: "Invalid image URL",
                            },
                        })}
                    />
                    {errors.image?.url && (
                        <p className="text-red-500">{errors.image?.url?.message}</p>
                    )}
                </section>

                {/* image.alt */}
                <section>
                    <input
                        placeholder="Image Description"
                        type="text"
                        {...register("image.alt", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.image?.alt && (
                        <p className="text-red-500">{errors.image?.alt?.message}</p>
                    )}
                </section>

                {/* sizes */}
                <section>
                    <input placeholder="Sizes" type="text[]" {...register('sizes', { required: "Sizes is required" })} />
                    {errors.sizes && <p className="text-red-500">{errors.sizes.message}</p>}
                </section>

                {/* model */}
                <section>
                    <input placeholder="Model" {...register('model', { required: 'Model is required' })} />
                    {errors.model && <p className="text-red-500">{errors.model.message}</p>}
                </section>

                {/* category */}
                <section>
                    <input placeholder="Category" {...register('category', { required: 'Category is required' })} />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                </section>

                <section>
                    <input placeholder="Quantity" type="number" {...register('quantity', { required: 'Quantity is required' })} />
                </section>

                <button type="submit">Create Card</button>
            </form>
        </div>
    );
};

export default CreateProduct;