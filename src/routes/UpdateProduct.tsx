import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProductById, updateProduct } from '../services/products';
import { IProduct } from '../@types/productType';
import './CreateProduct.scss';
import dialogs from '../ui/dialogs';



const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProduct>();
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
                    setValue('price', product.price);
                    setImageUrl(product.image.url);
                    setValue('alt', product.alt);
                    setValue('size', product.size);
                    setValue('color', product.color);
                    setValue('model', product.model);
                    setValue('category', product.category);
                    setValue('quantity', product.quantity);

                })
                .catch(err => setError(err));
        }
    }, [id, setValue]);


    const onSubmit = async (data: IProduct) => {
        try {
            if (id) {
                const formData = new FormData();
                formData.append("productName", data.productName);
                formData.append("subtitle", data.subtitle);
                formData.append("productDescription", data.productDescription);
                formData.append("price", data.price.toString());
                formData.append("color", data.color);
                formData.append("size", data.size.toString());
                formData.append("model", data.model);
                formData.append("category", data.category);
                formData.append("quantity", data.quantity.toString());
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
            console.log(data);
            dialogs.error("Error", error);
            console.log(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="create-card-container bg-blue-950 text-white dark:bg-slate-600">
            <h2>Update Product</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* title */}
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

                {/* image */}
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

                {/* alt */}
                <section>
                    <input placeholder="Image Description" {...register("alt", { required: "Image description is required" })} />
                    {errors.alt && <p className="text-red-500">{errors.alt.message}</p>}
                </section>

                {/* sizes */}
                <section>
                    <input placeholder="Size" {...register('size', { required: 'Size is required' })} />
                    {errors.size && <p className="text-red-500">{errors.size.message}</p>}
                </section>

                {/* color */}
                <section>
                    <input placeholder="Color" {...register('color', { required: 'Color is required' })} />
                    {errors.color && <p className="text-red-500">{errors.color.message}</p>}
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

                {/* quantity */}
                <section>
                    <input placeholder="Quantity" type="number" {...register('quantity', { required: 'Quantity is required' })} />
                    {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
                </section>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default UpdateProduct;