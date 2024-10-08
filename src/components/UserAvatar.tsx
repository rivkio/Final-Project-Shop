const UserAvatar = ({ firstName, lastName }) => {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

    return (
        <div className="flex items-center justify-center w-10 h-10 bg-green-300 text-white rounded-full ml-3 mr-3">
            <span className="text-lg font-semibold">{initials}</span>
        </div>
    );
};

export default UserAvatar;