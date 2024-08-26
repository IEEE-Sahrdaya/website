"use client";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/utils/firebase";
import {
  fetchSocietyData,
  getSociety,
  updateSocietyData,
} from "@/utils/FirebaseFunctions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0077be;
  color: white;
`;

const WelcomeText = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SignOutButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  height: 150px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  background-color: #0077be;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
`;

const SocietyPage = () => {
  const router = useRouter();
  const [society, setSociety] = useState("");
  const [societyData, setSocietyData] = useState({
    aboutText: "",
    backgroundImage: null,
    heroImage: null,
  });
  useEffect(() => {
    document.title = "Manage Society Page Data | IEEE Sahrdaya SB"
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return router.push("/signin");
      }
      const userSociety = await getSociety(user.uid);
      setSociety(userSociety);
      if (userSociety.toLowerCase() === "sb") {
        router.push("/"); // Redirect to home page or another appropriate page
        return;
      }
      const data = await fetchSocietyData(userSociety);
      setSocietyData(data);
    });
  }, []);
  if (society.toLowerCase() === "sb") {
    return null;
  }
  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    setSocietyData((prev) => ({ ...prev, [imageType]: file }));
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateSocietyData(
        auth.currentUser.uid,
        societyData
      );
      setSocietyData((prev) => ({
        ...prev,
        backgroundImage: updatedData.BgImagePath || prev.backgroundImage,
        heroImage: updatedData.HeroImagePath || prev.heroImage,
      }));
      alert("Society data updated successfully!");
    } catch (error) {
      console.error("Error updating society data:", error);
      alert("Failed to update society data. Please try again.");
    }
  };
  return (
    <Container>
      <Sidebar society={society}/>
      <div style={{ flex: 1 }}>
        <Header>
          <WelcomeText>
            Welcome, IEEE {society.toUpperCase()} SAHRDAYA
          </WelcomeText>
          <SignOutButton onClick={() => auth.signOut()}>Sign Out</SignOutButton>
        </Header>
        <Content>
          <FormSection>
            <h2 className="font-bold  text-center text-red-700">
              WARNING: Anything you change here will be reflected at your{" "}
              <a
                className="text-blue-700 underline"
                href={`https://ieeesahrdaya.com/societies/${society}`}
              >
                society website
              </a>
            </h2>
            <Label>About Text</Label>
            <TextArea
              value={societyData.aboutText}
              onChange={(e) =>
                setSocietyData({ ...societyData, aboutText: e.target.value })
              }
            />
          </FormSection>
          <FormSection>
            <Label>Background Image</Label>
            <Input
              type="file"
              onChange={(e) => handleImageChange(e, "backgroundImage")}
            />
            {societyData.backgroundImage && (
              <img
                src={
                  typeof societyData.backgroundImage === "string"
                    ? societyData.backgroundImage
                    : URL.createObjectURL(societyData.backgroundImage)
                }
                alt="Background Preview"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </FormSection>
          <FormSection>
            <Label>Hero Image</Label>
            <Input
              type="file"
              onChange={(e) => handleImageChange(e, "heroImage")}
            />
            {societyData.heroImage && (
              <img
                src={
                  typeof societyData.heroImage === "string"
                    ? societyData.heroImage
                    : URL.createObjectURL(societyData.heroImage)
                }
                alt="Hero Preview"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </FormSection>
          <SaveButton onClick={handleSave}>Save Changes</SaveButton>
        </Content>
      </div>
    </Container>
  );
};

export default SocietyPage;
