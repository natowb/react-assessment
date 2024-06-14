import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import { FieldError, RegisterOptions, SubmitHandler, UseFormRegister, UseFormRegisterReturn, Validate, useForm } from "react-hook-form";


type OrderFormFields = {
    firstName: string;
    lastName: string;
    description: string;
    quantity: number;
}





export default function OrderPage() {

    const { handleSubmit, register, formState: { errors } } = useForm<OrderFormFields>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<OrderFormFields> = (data) => {
        console.log(data);
        // TODO
        // Dispatch order to store.

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
                        required: "Must be a number between 1 and 20",
                        valueAsNumber: true,
                        validate: (value) => validateNumberRange(value, 1, 20),
                    })}
                />
                <button type="submit">Order</button>
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
        <div>
            <input {...register} type={type} placeholder={placeholder} />
            {error && <div>{error.message}</div>}
        </div>
    )
}