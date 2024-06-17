import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import { FieldError, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";

import "./OrderPage.css";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/orders/orderSlice";

type OrderFormFields = {
    firstName: string;
    lastName: string;
    description: string;
    quantity: number;
}


export default function OrderPage() {

    const { handleSubmit, register, formState: { errors } } = useForm<OrderFormFields>();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // This is only called when all validate is completed
    const onSubmit: SubmitHandler<OrderFormFields> = (data) => {
        dispatch(addOrder(data));
        navigate('/');
    }

    const validateStringLength = (value: string, maxLength: number) => {
        if (value.length <= maxLength) {
            return true;
        }
        return `should be no longer than ${maxLength}`;
    }

    const validateNumberRange = (value: number, min: number, max: number) => {
        if (value >= min && value <= max) {
            return true;
        }

        return "Must be a number between 1 and 20";
    }


    return <>
        <h1>Place an Order</h1>
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <OrderFormField

                    name="firstName"
                    type="text"
                    placeholder="John"
                    error={errors["firstName"]}
                    register={register("firstName", {
                        validate: (value) => validateStringLength(value, 20),
                    })}
                />

                <OrderFormField

                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    error={errors["lastName"]}
                    register={register("lastName", {
                        required: "Last Name is required",
                        validate: (value) => validateStringLength(value, 20),
                    })}
                />


                <OrderFormField

                    name="description"
                    type="text"
                    placeholder="Order Description"
                    error={errors["description"]}
                    register={register("description", {
                        required: "Description is required",
                        validate: (value) => validateStringLength(value, 100),
                    })}
                />

                <OrderFormField

                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    error={errors["quantity"]}
                    register={register("quantity", {
                        valueAsNumber: true,
                        validate: (value) => validateNumberRange(value, 1, 20),
                    })}
                />
                <button className="btn" type="submit">Order</button>
            </form>
        </Card>
    </>
}



type OrderFormFieldProps = {
    name: "firstName" | "lastName" | "description" | "quantity";
    type: string;
    placeholder: string;
    register: UseFormRegisterReturn<"firstName" | "lastName" | "description" | "quantity">;
    error?: FieldError;

}

function OrderFormField({ register, type, placeholder, error }: OrderFormFieldProps) {
    return (
        <div className="input-container">
            <input {...register} type={type} placeholder={placeholder} />
            {error && <p className="error-message">{error.message}</p>}
        </div>
    )
}