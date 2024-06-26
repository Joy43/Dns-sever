import { useForm } from "react-hook-form";

import { FaShoppingCart } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../../Hook/useAxiosSequre";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("https://dns-sever.vercel.app");
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Listen for new product notifications
    socket.on("newProductNotification", (product) => {
      // Show notification
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${product.name} is added to the menu.`,
        showConfirmButton: false,
        timer: 1500,
      });
    });

    return () => {
      socket.off("newProductNotification");
    };
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const productItem = {
        name: data.name,
        fingerprint: data.fingerprint,
        category: data.category,
        order: parseFloat(data.order),
        ipadress: data.ipadress,
        itemproduct: data.itemproduct,
        image: res.data.data.display_url,
      };
      //
      const productRes = await axiosSecure.post("/product", productItem);
      console.log(productRes.data);
      if (productRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
        socket.emit("productAdded", productItem);
      }
    }

    console.log(" image url", res.data);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" gap-5 flex">
            {/* ------name product */}
            <div className="form-control w-full my-6 ">
              <label className="label">
                <span className="label-text">Product Name*</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                {...register("name", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            {/* -------fingerprint--------- */}
            <div className="form-control w-full my-6 ">
              <label className="label">
                <span className="label-text">Fingigerprint</span>
              </label>
              <input
                type="text"
                placeholder="Finger print"
                {...register("fingerprint", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/*--------- category --------------*/}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="default"
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

            {/* ---------------order ------------*/}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Number of order</span>
              </label>
              <input
                type="number"
                placeholder="order"
                {...register("order", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* -----------ip -------- */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">IP Adress</span>
              </label>
              <input
                type="text"
                placeholder="ip adress"
                {...register("ipadress", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/*------------- product details ---------------*/}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Details</span>
            </label>
            <textarea
              {...register("itemproduct")}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">
            Add product <FaShoppingCart className="ml-4"></FaShoppingCart>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
