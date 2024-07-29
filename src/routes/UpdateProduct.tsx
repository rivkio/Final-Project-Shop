import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProduct.scss";
import dialogs from "../ui/dialogs";
import { getProductById, updateProduct } from "../services/products";
import { IProductInput } from "../@types/productType";
import { useState, useEffect } from "react";



// const UpdateProduct = () => {
//     const { id } = useParams<{ id: string }>();
//     const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProductInput>();
//     const [error, setError] = useState<Error | null>(null);
//     const navigate = useNavigate();
//     const [image, setImage] = useState<File | null>(null);
//     const [imageName, setImageName] = useState<string>("");
//     const [imageUrl, setImageUrl] = useState<string>("");

//     useEffect(() => {
//         if (id) {
//             getProductById(id)
//                 .then(res => {
//                     const product = res.data;
//                     setValue('productName', product.productName);
//                     setValue('subtitle', product.subtitle);
//                     setValue('productDescription', product.productDescription);
//                     setValue('price', product.price);
//                     setImageUrl(product.image.url);
//                     setValue('alt', product.alt);
//                     setValue('sizes', product.sizes.join(',')); // הפיכת המערך למחרוזת עם פסיקים
//                     setValue('color', product.color);
//                     setValue('model', product.model);
//                     setValue('category', product.category);
//                     setValue('quantity', product.quantity);
//                 })
//                 .catch(err => setError(err));
//         }
//     }, [id, setValue]);

//     const onSubmit = async (data: IProductInput) => {
//         try {
//             if (id) {
//                 const sizesArray: string[] = data.sizes.split(',').map((size: string) => parseInt(String(size).trim(), 10));
//                 const formData = new FormData();
//                 formData.append("productName", data.productName);
//                 formData.append("subtitle", data.subtitle);
//                 formData.append("productDescription", data.productDescription);
//                 formData.append("price", data.price.toString());

//                 sizesArray.forEach((size: string, index) => {
//                     formData.append(`sizes[${index}]`, size.toString());
//                 });

//                 formData.append("color", data.color);
//                 formData.append("model", data.model);
//                 formData.append("category", data.category);
//                 formData.append("quantity", data.quantity.toString());
//                 formData.append("alt", data.alt);
//                 if (image) {
//                     formData.append("image", image);
//                 } else {
//                     formData.append("imageUrl", imageUrl); // שימוש בתמונה הקיימת אם לא נבחרה תמונה חדשה
//                 }

//                 await updateProduct(id, formData);
//                 dialogs.success("Success", "Product updated successfully").then(() => {
//                     navigate("/admin/products");
//                 });
//             }
//         } catch (error: any) {
//             console.log(data);
//             dialogs.error("Error", error.response.data.message);
//             console.log(error);
//         }
//     };

//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <div className="create-card-container bg-blue-950 text-white dark:bg-slate-600">
//             <h2>Update Product</h2>
//             <form noValidate onSubmit={handleSubmit(onSubmit)}>
//                 {/* productName */}
//                 <section>
//                     <input placeholder="ProductName" {...register("productName", { required: "ProductName is required" })} />
//                     {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
//                 </section>

//                 {/* subtitle */}
//                 <section>
//                     <input placeholder="Subtitle" {...register("subtitle", { required: "Subtitle is required" })} />
//                     {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
//                 </section>

//                 {/* description */}
//                 <section>
//                     <input placeholder="ProductDescription" {...register("productDescription", { required: "ProductDescription is required" })} />
//                     {errors.productDescription && <p className="text-red-500">{errors.productDescription.message}</p>}
//                 </section>

//                 {/* price */}
//                 <section>
//                     <input placeholder="Price" type="number" step="0.01" {...register('price', { required: 'Price is required' })} />
//                     <span className="error-message">{errors.price && errors.price.message}</span>
//                 </section>

//                 {/* image */}
//                 <section>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         className="custom-file-upload"
//                         onChange={(e) => {
//                             const file = e.target.files?.[0] || null;
//                             setImage(file);
//                             setImageName(file ? file.name : "");
//                         }}
//                     />
//                     {imageName && <p className="file-name">{imageName}</p>}
//                 </section>

//                 {/* alt */}
//                 <section>
//                     <input placeholder="Image Description" {...register("alt", { required: "Image description is required" })} />
//                     {errors.alt && <p className="text-red-500">{errors.alt.message}</p>}
//                 </section>

//                 {/* sizes */}
//                 <section>
//                     <input placeholder="Size" {...register('sizes', { required: 'Size is required' })} />
//                     {errors.sizes && <p className="text-red-500">{errors.sizes.message}</p>}
//                 </section>

//                 {/* color */}
//                 <section>
//                     <input placeholder="Color" {...register('color', { required: 'Color is required' })} />
//                     {errors.color && <p className="text-red-500">{errors.color.message}</p>}
//                 </section>

//                 {/* model */}
//                 <section>
//                     <input placeholder="Model" {...register('model', { required: 'Model is required' })} />
//                     {errors.model && <p className="text-red-500">{errors.model.message}</p>}
//                 </section>

//                 {/* category */}
//                 <section>
//                     <input placeholder="Category" {...register('category', { required: 'Category is required' })} />
//                     {errors.category && <p className="text-red-500">{errors.category.message}</p>}
//                 </section>

//                 {/* quantity */}
//                 <section>
//                     <input placeholder="Quantity" type="number" {...register('quantity', { required: 'Quantity is required' })} />
//                     {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
//                 </section>

//                 <button type="submit">Save</button>
//             </form>
//         </div>
//     );
// };

// export default UpdateProduct;

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<IProductInput>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    });
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    const product = res.data;
                    setValue('productName', product.productName);
                    setValue('subtitle', product.subtitle);
                    setValue('productDescription', product.productDescription);
                    setValue('alt', product.alt);
                    setImageUrl(product.image.url);

                    // הוספת מערך ה- variants
                    setValue('variants', product.variants);

                    // אם יש תמונה ישנה
                    setImageName(product.image.url.split('/').pop() || "");
                })
                .catch(err => setError(err));
        }
    }, [id, setValue]);

    const onSubmit = async (data: IProductInput) => {
        try {
            if (id) {
                const formData = new FormData();
                formData.append("productName", data.productName);
                formData.append("subtitle", data.subtitle);
                formData.append("productDescription", data.productDescription);

                // הוספת variants
                data.variants.forEach((variant, index) => {
                    formData.append(`variants[${index}][size]`, variant.size);
                    formData.append(`variants[${index}][price]`, variant.price.toString());
                    formData.append(`variants[${index}][quantity]`, variant.quantity.toString());
                });

                formData.append("alt", data.alt);
                if (image) {
                    formData.append("image", image);
                } else {
                    formData.append("imageUrl", imageUrl); // שימוש בתמונה הקיימת אם לא נבחרה תמונה חדשה
                }

                await updateProduct(id, formData);
                dialogs.success("Success", "Product updated successfully").then(() => {
                    navigate("/admin/products");
                });
            }
        } catch (error: any) {
            dialogs.error("Error", error.response?.data?.message || "Failed to update product");
            console.log(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="create-card-container bg-blue-950 text-white dark:bg-slate-600">
            <h2>Edit Product</h2>
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
                    <input placeholder="ProductDescription" {...register("productDescription", { required: "ProductDescription is required" })} />
                    {errors.productDescription && <p className="text-red-500">{errors.productDescription.message}</p>}
                </section>
                <section>
                    <input
                        type="file"
                        accept="image/*"
                        className="custom-file-upload"
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
                    <h3>Variants</h3>
                    {fields.map((variant, index) => (
                        <div key={variant.id} className="variant">
                            <input placeholder="Size" {...register(`variants.${index}.size` as const, { required: "Size is required" })} />
                            <input placeholder="Price" type="number" step="0.01" {...register(`variants.${index}.price` as const, { required: "Price is required" })} />
                            <input placeholder="Quantity" type="number" {...register(`variants.${index}.quantity` as const, { required: "Quantity is required" })} />
                            <button type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ size: "", price: 0, quantity: 0 })}>Add Variant</button>
                </section>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProduct;