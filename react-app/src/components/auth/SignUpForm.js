import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { months, years } from "./Utils";
import moment from "moment";

const SignUpForm = ({ setShowModal }) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let date = new Date();

  const [month, setMonth] = useState(
    moment(date).format("MMMM Do YYYY, h:mm:ss a").split(",")[0].split(" ")[0]
  );
  const [day, setDay] = useState("1");
  const [year, setYear] = useState(
    moment(date).format("MMMM Do YYYY, h:mm:ss a").split(",")[0].split(" ")[2]
  );

  const onSignUp = async (e) => {
    e.preventDefault();

    let birthday = new Date(`${day} ${month} ${year}`);
    birthday = birthday.toISOString();

    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, username, email, password, birthday)
      );
      if (data) {
        setErrors(data);
      } else {
        setShowModal(false);
        history.push("/home");
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="header__of__form">
        <div className="text__one">Sign Up</div>
        <div className="text__two">It’s quick and easy.</div>
      </div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="create__account__input__name__container">
          <input
            className="create__account__input__name"
            type="text"
            name="FirstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            placeholder="First name"
          ></input>
          <input
            className="create__account__input__name"
            type="text"
            name="LastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            placeholder="Last name"
          ></input>
        </div>
        <div className="create__account__input__name__container">
          <input
            className="create__account__input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder="Username"
          ></input>
        </div>
        <div className="create__account__input__name__container">
          <input
            className="create__account__input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder="Email"
          ></input>
        </div>
        <div className="create__account__input__name__container">
          <input
            className="create__account__input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            required={true}
            placeholder="New password"
          ></input>
        </div>
        <div className="create__account__input__name__container">
          <input
            className="create__account__input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder="Confirm password"
          ></input>
        </div>
        <span className="birthday">Birthday</span>
        <div className="create__account__input__name__container">
          <select
            className="create__birthday__input"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
            required
          >
            {months.map((month) => {
              return (
                <option value={month} key={month}>
                  {month}
                </option>
              );
            })}
          </select>
          <select
            className="create__birthday__input"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
            }}
            required
          >
            {Array.apply(null, Array(31)).map(function (x, i) {
              return (
                <option value={(i += 1)} key={i}>
                  {i}
                </option>
              );
            })}
          </select>
          <select
            className="create__birthday__input"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
            required
          >
            {years.map((year) => {
              return (
                <option value={year} key={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div className="create__account__input__name__container">
          <button className="create__account__submit__button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
