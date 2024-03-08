

const ProfileEdit = () => {


  return (
    <div className="profile-form">
      <h2>Edit Profile</h2>
      <form >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
