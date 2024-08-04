const partiallyHidePhoneNumber = (phoneNumber: string) => {
  return (
    phoneNumber.slice(0, 2) + phoneNumber.slice(2).replace(/.(?=...)/g, "*")
  );
};

const partiallyHideEmail = (email: string) => {
  const [username, domain] = email.split("@");

  return email.replace(username, "*".repeat(username.length));
};

export { partiallyHidePhoneNumber, partiallyHideEmail };