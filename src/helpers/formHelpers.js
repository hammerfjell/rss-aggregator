function handleFormChange(e, setFormData) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
    }));
}

export {
    handleFormChange
}