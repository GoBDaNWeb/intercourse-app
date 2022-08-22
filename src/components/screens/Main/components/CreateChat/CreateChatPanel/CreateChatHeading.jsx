const CreateChatHeading = () => {
    return (
        <div className="text-secondary">
            <h2 className="font-bold text-2xl text-primary">create chat</h2>
            <h5 className="flex items-center gap-1">
                <span className="text-3xl">&#9737;</span> select one user to
                create personal chat
            </h5>
            <h5 className="flex items-center gap-1">
                <span className="text-3xl">&#9737;</span> select multiple users
                to create group chat
            </h5>
        </div>
    );
};

export default CreateChatHeading;
