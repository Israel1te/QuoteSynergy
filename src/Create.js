const Create = () => {

    return (
        <div className="create">
            <h2>Login / Create Account</h2>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
      );
}
 
export default Create;