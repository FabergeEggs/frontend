"use client"

import styles from "./profilepage.module.css";
import ProfilePictureInput from "@/src/ui/inputs/ProfilePictureInput/ProfilePictureInput";
import ProfileForm from "@/src/ui/forms/ProfileForm/ProfileForm";
import Image from "next/image";
import TransparentTextImageButton from "@/src/ui/buttons/TransparentTextImageButton/TransparentTextImageButton";
import ProjectCard from "@/src/ui/info/ProjectCard/ProjectCard";
import Link from "next/link";

import ArrowRight from "@/public/assets/arrow-right.svg"
import ArrowDown from "@/public/assets/arrow-down.svg"
import NewImage from "@/public/assets/profile/new.svg"
import FindImage from "@/public/assets/profile/find.svg"

import { useState, useEffect } from "react";
import {
  ProjectStatusEnum,
  type MembershipProjectDTO,
} from "@/src/lib/models/export/project";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useProfileInfo } from "@/src/lib/query/profile";
import { useUserMemberships } from "@/src/lib/query/project";
import { updateProfile } from "@/src/lib/api/profile";
import { getQueryStatus } from "@/src/lib/query/status";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

// <!> Mocking
import { getMockProfile, getMockUserMemberships } from "@/src/lib/api/mockData";

export default function ProfilePageMock() {
  const [showScientistProjects, setShowScientistProjects] = useState(true);
  const [showVolunteerProjects, setShowVolunteerProjects] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");

  const { userId, isLoading } = useAuth();

  // const profileQuery = useProfileInfo(userId || "");
  // const profileStatus = getQueryStatus(profileQuery);
  // const profileData = profileQuery.data;
  const profileStatus = { isLoading: false, isError: false, errorMessage: null };
  const profileData = getMockProfile(userId || "mock-user-1");

  // Sync avatar URL from loaded profile data
  useEffect(() => {
    if (profileData?.avatar_url !== undefined) {
      setAvatarUrl(profileData.avatar_url);
    }
  }, [profileData?.avatar_url]);

  // const membershipsQuery = useUserMemberships(userId || "");
  // const membershipsStatus = getQueryStatus(membershipsQuery);
  // const memberships = membershipsQuery.data ?? { scientist: [], volunteer: [] };
  const memberships = getMockUserMemberships(userId || "mock-user-1");

  const toggleScientistProjects = () => {
    setShowScientistProjects(prev => !prev);
  };

  const toggleVolunteerProjects = () => {
    setShowVolunteerProjects(prev => !prev);
  };

  if (isLoading) {
    return <div className="centered">Загрузка…</div>;
  }

  if (profileStatus.isLoading) {
    return <div className="centered">Загрузка профиля…</div>;
  }

  if (profileStatus.isError || !profileData) {
    return (
      <div className="centered">
        <ValidationError
          messages={[profileStatus.errorMessage ?? "Не удалось загрузить профиль"]}
        />
      </div>
    );
  }

  const scientistProjects = memberships.scientist ?? [];
  const volunteerProjects = memberships.volunteer ?? [];

  // <!> This page has bad adaptivity in .headerTitle 
  return (
    <div className="pagecontainer">
      <h2 className={styles.title}>Профиль</h2>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <ProfileForm data={profileData} avatarUrl={avatarUrl} />
        </div>
        <div className={styles.pictureInputContainer}>
          <ProfilePictureInput
            value={avatarUrl}
            onChange={async ({ assetId, displayUrl }) => {
              setAvatarUrl(displayUrl);
              if (profileData && userId) {
                try {
                  await updateProfile(userId, {
                    first_name: profileData.first_name,
                    last_name: "",
                    bio: profileData.bio || "",
                    avatar_asset_id: assetId,
                  });
                } catch {
                  // аватар отображается локально, при перезагрузке profile_service
                  // вернёт свежий URL через media_service S2S
                }
              }
            }}
            onDelete={async () => {
              setAvatarUrl("");
              if (profileData && userId) {
                try {
                  await updateProfile(userId, {
                    first_name: profileData.first_name,
                    last_name: "",
                    bio: profileData.bio || "",
                    avatar_url: "",
                    avatar_asset_id: "",
                  });
                } catch {
                  // ignore
                }
              }
            }}
          />
        </div>
      </div>
      <div className={styles.projectsContainer}>
        <div className={styles.myProjectsContainer}>
          <div className={styles.myProjectsHeader}>
            <div className={styles.headerTitle} onClick={toggleScientistProjects}>
              <h2 className={styles.title}>Мои проекты</h2>
              { scientistProjects.length > 0 && <Image src={showScientistProjects ? ArrowDown : ArrowRight} alt="arrow-right" />}
            </div>
            { scientistProjects.length > 0 && (
              <Link className="basic-link" href="/feed/create">
                <TransparentTextImageButton
                  src={NewImage}
                  text="Создать новый проект"
                  color="black"
                />
              </Link>
            )}
          </div>
          { (showScientistProjects && scientistProjects.length > 0) && 
            <div className={styles.projects}>
              {scientistProjects.map((value, index) => <ProjectCard {...value} key={index} />)}
            </div>
          }

          { (scientistProjects.length == 0) && <div className={styles.noProjects}>
            <p>У вас пока что нет проектов.</p>
            <Link
              href="/feed/create"
              className="basic-link"
            >
              <button className={`basic-btn ${styles.noProjectsBtn}`}>
                Создать проект
              </button>
            </Link>
          </div>}
        </div>
        <div className={styles.myProjectsContainer}>
          <div className={styles.myProjectsHeader}>
            <div className={styles.headerTitle} onClick={toggleVolunteerProjects}>
              <h2 className={styles.title}>Участие в проектах</h2>
              {volunteerProjects.length > 0 && <Image src={showVolunteerProjects ? ArrowDown : ArrowRight} alt="arrow-right" />}
            </div>
            {volunteerProjects.length > 0 && <Link className="basic-link" href="/feed">
              <TransparentTextImageButton src={FindImage} text="Найти новый проект" color="black"/>
            </Link>}
          </div>
          { (showVolunteerProjects && volunteerProjects.length > 0) && <div className={styles.projects}>
            {volunteerProjects.map((value, index) => <ProjectCard {...value} key={index} />)}
          </div>}
          { (volunteerProjects.length == 0) && 
            <div className={styles.noProjects}>
              <p>Вы пока не участвуете ни в каких проектах.</p>
              <Link className="basic-link" href="/feed">
                <button className={`basic-btn ${styles.noProjectsBtn}`}>
                  Найти проект
                </button>
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
