import axios from "axios";
import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { Hint } from "./Hint";
import "./style.css";

const domains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "aol.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "msn.com",
  "yahoo.fr",
  "wanadoo.fr",
  "yandex.ru",
  "ymail.com",
  "mail.ru",
];

export const Form = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [hints, setHints] = useState("");
  const [isSucces, setIsSucces] = useState("");
  const [reason, setReason] = useState("");
  function validate(email) {
    setError("");
    setIsSucces("");
    setHints([]);
    if (email) {
      // axios({
      //   method: "GET",
      //   url: "https://mailcheck.p.rapidapi.com/",
      //   params: { domain: email },
      //   headers: {
      //     "x-rapidapi-host": "mailcheck.p.rapidapi.com",
      //     "x-rapidapi-key":
      //       "a7fa2e61a4msh2ff7545987bdf5dp12e4a4jsnf9f5d4a8a22e",
      //   },
      // })
      //   .then((response) => {
      //     return response.data;
      //   })
      //   .then((result) => {
      //     console.log(result);
      //     if (!result.valid) {
      //       setError(result.text);
      //     } else {
      //       setError("");
      //       setIsSucces("Succes");
      //     }
      //   });
      axios
        .get(
          `https://api.kickbox.com/v2/verify?email=${email}&apikey=live_b27fd43e5a4cacd838f8af7332adefb185828d6be7fad13dc3de3e8fda799a33`
        )
        .then((response) => {
          console.log(response);
          return response.data;
        })
        .then((data) => {
          setError(data.result);
          setReason(data.reason);
        });
      getHints(email);
    }
  }

  function getHints(email) {
    if (!email.includes("@")) {
      setHints(
        domains.map((domain, index) => {
          return { id: index, value: email + "@" + domain };
        })
      );
    } else {
      let temp = email.split("@")[1];
      if (temp) {
        setHints(
          domains
            .filter((domain) => domain.includes(temp))
            .map((domain, index) => {
              return { id: index, value: email.split("@")[0] + "@" + domain };
            })
        );
      }
      if (!email.split("@")[0]) {
        setHints([]);
      }
    }
    if (!email) {
      setHints([]);
    }
  }

  return (
    <div className="form">
      <div className="d-flex flex-column align-items-center">
        <div className="text-white fs-3">Enter email:</div>
        <DebounceInput
          className="email-input mt-2"
          placeholder="alex@gmail.com"
          value={email}
          minLength={1}
          debounceTimeout={1000}
          onChange={(event) => validate(event.target.value)}
        />
      </div>
      <div className="fs-5 text-center mt-2">
        {error ? (
          <div className="text-white">
            {error} ({reason})
          </div>
        ) : (
          <div className="text-success">{isSucces}</div>
        )}
      </div>

      {hints.length ? (
        <div className="ms-2">
          <div className="fs-4 text-white">Did you mean:</div>
          {hints.map((hint) => (
            <Hint
              key={hint.id}
              value={hint.value}
              hadleClick={() => {
                setEmail(hint.value);
                validate(hint.value);
                setHints([]);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
