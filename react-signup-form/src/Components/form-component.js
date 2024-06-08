import React from "react";

const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const phoneValidator = /^\+?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharValidator = /^\d{12}$/;

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      username: "",
      phoneNo: "",
      country: "",
      city: "",
      panNo: "",
      aadharNo: "",
      errors: {},
      isFormSubmitted: false,
      showPassword: false,
      countries: ["India", "USA", "UK"], // Add more countries as needed
      cities: {
        India: ["New Delhi", "Mumbai", "Bangalore"], // Add more cities as needed
        USA: ["New York", "Los Angeles", "Chicago"],
        UK: ["London", "Manchester", "Birmingham"],
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleBlur(event) {
    const { name } = event.target;
    this.validateField(name);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formFields = [
      "firstName",
      "lastName",
      "emailAddress",
      "password",
      "passwordConfirmation",
      "username",
      "phoneNo",
      "country",
      "city",
      "panNo",
      "aadharNo",
    ];

    let isValid = true;
    formFields.forEach((field) => {
      isValid = this.validateField(field) && isValid;
    });

    if (isValid) {
      this.setState({ isFormSubmitted: true });
    } else {
      this.setState({ isFormSubmitted: false });
    }
  }

  validateField(name) {
    let isValid = false;
    const errors = { ...this.state.errors };

    switch (name) {
      case "firstName":
        isValid = this.state.firstName.trim() !== "";
        errors.firstName = isValid ? "" : "First Name is required";
        break;
      case "lastName":
        isValid = this.state.lastName.trim() !== "";
        errors.lastName = isValid ? "" : "Last Name is required";
        break;
      case "emailAddress":
        isValid =
          this.state.emailAddress.trim() !== "" &&
          emailValidator.test(this.state.emailAddress);
        errors.emailAddress = isValid
          ? ""
          : "Email Address is required and must be valid";
        break;
      case "password":
        isValid =
          this.state.password.trim() !== "" &&
          passwordValidator.test(this.state.password);
        errors.password = isValid
          ? ""
          : "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
        break;
      case "passwordConfirmation":
        isValid = this.state.password === this.state.passwordConfirmation;
        errors.passwordConfirmation = isValid
          ? ""
          : "Password does not match Confirmation";
        break;
      case "username":
        isValid = this.state.username.trim() !== "";
        errors.username = isValid ? "" : "Username is required";
        break;
      case "phoneNo":
        isValid =
          this.state.phoneNo.trim() !== "" &&
          phoneValidator.test(this.state.phoneNo);
        errors.phoneNo = isValid
          ? ""
          : "Phone number is required and must be valid";
        break;
      case "country":
        isValid = this.state.country.trim() !== "";
        errors.country = isValid ? "" : "Country is required";
        break;
      case "city":
        isValid = this.state.city.trim() !== "";
        errors.city = isValid ? "" : "City is required";
        break;
      case "panNo":
        isValid =
          this.state.panNo.trim() !== "" && panValidator.test(this.state.panNo);
        errors.panNo = isValid
          ? ""
          : "PAN number is required and must be valid";
        break;
      case "aadharNo":
        isValid =
          this.state.aadharNo.trim() !== "" &&
          aadharValidator.test(this.state.aadharNo);
        errors.aadharNo = isValid
          ? ""
          : "Aadhar number is required and must be valid";
        break;
      default:
        break;
    }

    this.setState({ errors });
    return isValid;
  }

  togglePasswordVisibility() {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      passwordConfirmation,
      username,
      phoneNo,
      country,
      city,
      panNo,
      aadharNo,
      errors,
      isFormSubmitted,
      showPassword,
      countries,
      cities,
    } = this.state;

    return (
      <div className="main">
        <h3>SignUp Form</h3>
        {isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
            <div>Email Address: {emailAddress}</div>
            <div>Username: {username}</div>
            <div>Phone Number: {phoneNo}</div>
            <div>Country: {country}</div>
            <div>City: {city}</div>
            <div>PAN Number: {panNo}</div>
            <div>Aadhar Number: {aadharNo}</div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.firstName && (
                <div className="errorMsg">{errors.firstName}</div>
              )}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.lastName && (
                <div className="errorMsg">{errors.lastName}</div>
              )}
              <input
                type="email"
                placeholder="Email Address"
                name="emailAddress"
                value={emailAddress}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.emailAddress && (
                <div className="errorMsg">{errors.emailAddress}</div>
              )}
              {/* <div style={{ position: "relative", display: "inline-block" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={this.togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <br />
              {errors.password && (
                <div className="errorMsg">{errors.password}</div>
              )}
              <div style={{ position: "relative", display: "inline-block" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={this.togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <br />
              {errors.passwordConfirmation && (
                <div className="errorMsg">{errors.passwordConfirmation}</div>
              )} */}
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.username && (
                <div className="errorMsg">{errors.username}</div>
              )}
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNo"
                value={phoneNo}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.phoneNo && (
                <div className="errorMsg">{errors.phoneNo}</div>
              )}
              <select
                name="country"
                value={country}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <br />
              {errors.country && (
                <div className="errorMsg">{errors.country}</div>
              )}
              <select
                name="city"
                value={city}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                disabled={!country}
              >
                <option value="">Select City</option>
                {country &&
                  cities[country].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              <br />
              {errors.city && <div className="errorMsg">{errors.city}</div>}
              <input
                type="text"
                placeholder="PAN Number"
                name="panNo"
                value={panNo}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.panNo && <div className="errorMsg">{errors.panNo}</div>}
              <input
                type="text"
                placeholder="Aadhar Number"
                name="aadharNo"
                value={aadharNo}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.aadharNo && (
                <div className="errorMsg">{errors.aadharNo}</div>
              )}
              <div style={{ position: "relative", display: "inline-block" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={this.togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <br />
              {errors.password && (
                <div className="errorMsg">{errors.password}</div>
              )}
              <div style={{ position: "relative", display: "inline-block" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={this.togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <br />
              {errors.passwordConfirmation && (
                <div className="errorMsg">{errors.passwordConfirmation}</div>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponent;