import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { createNewProduct } from "../services/products";
import { useAuth } from "../hooks/useAuth";
import { IProductInput } from "../@types/productType";
import { useState } from "react";



const CreateProduct = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control } = useForm<IProductInput>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    });
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");

    const onSubmit = async (data: IProductInput) => {
        if (!token) {
            dialogs.error("Error", "No authentication token found.");
            return;
        }

        if (!image) {
            dialogs.error("Error", "Please select an image.");
            return;
        }

        // פיצול השדה sizes למערך מספרים
        // const sizesArray: string[] = data.sizes.split(',').map((size: string) => parseInt(String(size).trim(), 10));

        const formData = new FormData();
        formData.append("productName", data.productName);
        formData.append("subtitle", data.subtitle);
        formData.append("productDescription", data.productDescription);

        data.variants.forEach((variant, index) => {
            formData.append(`variants[${index}][size]`, variant.size);
            formData.append(`variants[${index}][price]`, variant.price.toString());
            formData.append(`variants[${index}][quantity]`, variant.quantity.toString());
        });
        formData.append("alt", data.alt);
        if (image) {
            formData.append("image", image);
        }

        try {
            console.log("Form Data:", Object.fromEntries(formData.entries())); // לוג לפני שליחה
            await createNewProduct(formData);
            dialogs.success("Success", "Product Created Successfully")
                .then(() => {
                    navigate("/");

                });
        } catch (error: any) {
            console.log("Form Data Error:", Object.fromEntries(formData.entries())); // לוג בשגיאה
            dialogs.error("Error", error.response?.data?.message || "Failed to create product");
            console.log(error);
        }
    };

    return (
        <div className="create-card-container bg-blue-950 text-white dark:bg-slate-600">
            <h2>Create New Product</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <input placeholder="ProductName" {...register("productName", { required: "ProductName is required" })} />
                    {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
                </section>
                <section>
                    <input placeholder="Subtitle" {...register("subtitle", { required: "Subtitle is required" })} />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </section>
                <section>
                    <input placeholder="ProductDescription" {...register("productDescription", { required: "Description is required" })} />
                    {errors.productDescription && <p className="text-red-500">{errors.productDescription.message}</p>}
                </section>
                <section>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setImage(file);
                            setImageName(file ? file.name : "");
                        }}
                    />
                    {imageName && <p className="file-name">{imageName}</p>}
                </section>

                <section>
                    <input placeholder="Image Description" {...register("alt", { required: "Image description is required" })} />
                    {errors.alt && <p className="text-red-500">{errors.alt.message}</p>}
                </section>
                <section>
                    <h3 className="mb-2">Variants:</h3>
                    {fields.map((variant, index) => (
                        <div key={variant.id} className="variant">
                            <input placeholder="Size" {...register(`variants.${index}.size` as const, { required: "Size is required" })} />
                            <input placeholder="Price" type="number" step="0.01" {...register(`variants.${index}.price` as const, { required: "Price is required" })} />
                            <input placeholder="Quantity" type="number" {...register(`variants.${index}.quantity` as const, { required: "Quantity is required" })} />
                            <button type="button" className="removeButton" onClick={() => remove(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="add-variant-button" onClick={() => append({ _id: "", size: "", price: null, quantity: null })}>Add Variant</button>
                </section>

                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;