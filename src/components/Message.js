const colors = {
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
    default: 'white'
}

export function Message({ children, bgColor = 'white', textColor='black' }) {
    return (
        <div style={{ backgroundColor: bgColor, color: textColor }} className={`flex items-center rounded-lg px-4 py-[2px]`}>
            <p>{children}</p>
        </div>
    )
}

export function QueryMessage({ queryObject }) {

    if(!queryObject) {
        return (
            <Message bgColor={colors.error}>
                Ivalid query object
            </Message>
        );
    }

    if(queryObject.isSuccess) {
        const successMessage = queryObject.data.message || "Operation successful!";

        return (
            <Message bgColor={colors.success}>
                {successMessage}
            </Message>
        );
    }

    if(queryObject.isError) {
        return <Error queryObject={queryObject} />;
    }

    return (
        <Message bgColor='transparent'>&nbsp;</Message>
    )
}

export function Error({message, queryObject}) {

    const errorMessage = message || queryObject.error?.response?.data?.message || queryObject.error?.message || "Something went wrong!";

    return (
        <Message bgColor={colors.error}>
            {errorMessage}
        </Message>
    );
}