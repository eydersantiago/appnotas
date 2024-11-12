import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) {
                return false;
            }
        }

        return true;

    }, [formValidation])

    const onInputChange = ({ target }) => {

        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        })

    }

    const handleReset = () => {
        setFormState(initialForm)
    }

    const createValidators = () => {

        const formCheckValues = {};

        for (const formField of Object.keys(formValidations)) {

            /* se recorre cada uno de las propiedades del objeto de formValidations y se filtra la funcion
            y el mensaje de error en el caso de que lo haya */

            const [fn, errorMessage] = formValidations[formField];

            /*comparamos cada una de las propiedades del formState y vemos si cumplen con la funcion 
            de validacion, si lo hace, se envia un null, si no , el mensaje de error que viene del formValidations */
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckValues);

    }

    return {
        ...formState,
        formState,
        onInputChange,
        handleReset,
        ...formValidation,
        isFormValid
    }

}