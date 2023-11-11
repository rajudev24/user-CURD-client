import { useState } from "react";
import { Select, Input, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { TextArea } = Input;
import {
  ContentProfession,
  EntrepreneurProfession,
  MarketingProfession,
  Profession,
} from "../../utils";

const Label = ({ text }) => <label htmlFor="">{text}</label>;

export default function UserDashboard({ setIsUpdate }) {
  const [profession, setProfession] = useState("");
  const [subProfession, setSubProfession] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const userId = localStorage.getItem("UserId");

  const handleChange = (value) => {
    setProfession(value);
    setSubProfession("");
  };
  const handleSubProfessionChange = (value) => {
    setSubProfession(value);
  };
  const handleTextAreaChange = (e) => {
    setAboutYou(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      profession,
      subProfession,
      text: aboutYou,
      authorId: userId,
    };
    try {
      const url = "http://localhost:5000/api/v1/post/add-post";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Post Added Successful");
        setIsUpdate(true);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
    setProfession("");
    setSubProfession("");
    setAboutYou("");
  };

  return (
    <div className="flex justify-center items-center my-8">
      <div className="w-[600px] m-auto">
        <Label text="Select Your Profession" />
        <Select
          className="h-10 border-2 w-full rounded-md my-2"
          style={{ textAlign: "start" }}
          defaultValue="Marketing Professional"
          onChange={handleChange}
          options={Profession}
        />

        {profession && (
          <>
            <Label text={`Select Your ${profession}`} />
            <Select
              className="h-10 border-2 w-full rounded-md my-2"
              style={{ textAlign: "start" }}
              value={subProfession}
              onChange={handleSubProfessionChange}
              options={
                profession === "Marketing Professional"
                  ? MarketingProfession
                  : profession === "Entrepreneur"
                  ? EntrepreneurProfession
                  : profession === "Content Creator"
                  ? ContentProfession
                  : []
              }
            />
          </>
        )}
        <Label text="Write About You!!" />
        <TextArea
          className="my-2"
          rows={4}
          placeholder="write under 50 words"
          maxLength={50}
          value={aboutYou}
          onChange={handleTextAreaChange}
        />
        <Button
          style={{
            backgroundColor: "#7f03fc",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
