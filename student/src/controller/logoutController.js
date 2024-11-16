exports.logout = (req, res) => {
    return res
        .status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .clearCookie("roleId")
        .json({ message: "Logout success" });
};