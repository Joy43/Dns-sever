import { useLoaderData } from "react-router-dom";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../../Hook/useAxiosSequre";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, itemproduct, order, _id, ipadress, fingerprint } =
    useLoaderData() || {};

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // ----------image upload to imgbb ------------
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const productItem = {
        name: data.name,
        fingerprint: data.fingerprint,
        category: data.category,
        order: parseFloat(data.order),
        ipadress: parseFloat(data.ipadress),
        itemproduct: data.itemproduct,
        image: res.data.data.display_url,
      };
      //
      const productRes = await axiosSecure.patch(
        `/product/${_id}`,
        productItem
      );
      console.log(productRes.data);
      if (productRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the product.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              defaultValue={name}
              placeholder="Product Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* -------fingerprint--------- */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Fingigerprint</span>
              </label>
              <input
                type="text"
                defaultValue={fingerprint}
                placeholder="Fringerprint"
                {...register("fingerprint", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* -------------category-----------------*/}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="amber">amber</option>
                <option value="MX">MX</option>
                <option value="TCNAME">CNAME</option>
                <option value="TXT">TXT</option>
                <option value="NS">NS</option>
                <option value="SP">SP</option>
                <option value="DNSKEY">DNSKEY</option>
              </select>
            </div>

            {/*------------- order ----------------------*/}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">order*</span>
              </label>
              <input
                type="number"
                defaultValue={order}
                placeholder="order"
                {...register("order", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* ----------ip adress------ */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Product Name*</span>
              </label>
              <input
                type="text"
                defaultValue={ipadress}
                placeholder="ipadress"
                {...register("ipadress", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/*--------------------itemproduct details ----------------*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Details</span>
            </label>
            <textarea
              defaultValue={itemproduct}
              {...register("itemproduct")}
              className="textarea textarea-bordered h-24"
              placeholder="deatils"
            ></textarea>
          </div>
          {/* ---------------------image---------------------- */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">Update Product Item</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
