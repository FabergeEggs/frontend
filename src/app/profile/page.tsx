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
import { useUserMemberships } from "@/src/lib/query/project";
import { useProfileInfo } from "@/src/lib/query/profile";
import { useCurrentAvatarUrl } from "@/src/lib/query/media";
import { getQueryStatus } from "@/src/lib/query/status";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

import {useProjectStatistics} from "@/src/lib/query/project"

const ProjectCardWithStats = ({ project }: { project: MembershipProjectDTO }) => {
  const statsQuery = useProjectStatistics(project.project_id);
  
  if (statsQuery.isLoading) {
    return <div>Загрузка...</div>;
  }
  
  return <ProjectCard {...project} {...statsQuery.data} />;
};

export default function ProfilePage() {
  const [showScientistProjects, setShowScientistProjects] = useState(true);
  const [showVolunteerProjects, setShowVolunteerProjects] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const { userId, isLoading } = useAuth();

  const profileQuery = useProfileInfo(userId || "");
  const profileStatus = getQueryStatus(profileQuery);
  const profileData = profileQuery.data;

  const avatarQuery = useCurrentAvatarUrl();

  useEffect(() => {
    if (avatarUrl === null && avatarQuery.data) {
      setAvatarUrl(avatarQuery.data);
    }
  }, [avatarQuery.data, avatarUrl]);

  const membershipsQuery = useUserMemberships(userId || "");
  const membershipsStatus = getQueryStatus(membershipsQuery);
  const memberships = membershipsQuery.data ?? { scientist: [], volunteer: [] };

  const scientistProjects = memberships.scientist ?? [];
  const volunteerProjects = memberships.volunteer ?? [];

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

  // <!> This page has bad adaptivity in .headerTitle 
  return (
    <div className="pagecontainer">
      <h2 className={styles.title}>Профиль</h2>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <ProfileForm data={profileData} />
        </div>
        <div className={styles.pictureInputContainer}>
          <ProfilePictureInput value={avatarUrl ?? ""} onChange={setAvatarUrl} />
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
          {showScientistProjects && scientistProjects.length > 0 && (
  <div className={styles.projects}>
    {scientistProjects.map((value, index) => 
      <ProjectCardWithStats project={value} key={index} />
    )}
  </div>
)}

          {
            (scientistProjects.length == 0) && <div className={styles.noProjects}>
              <p>У вас пока что нет проектов.</p>
              <Link
                href="/feed/create"
                className="basic-link"
              >
                <button className={`basic-btn ${styles.noProjectsBtn}`}>
                  Создать проект
                </button>
              </Link>
            </div>
          }
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
          {showVolunteerProjects && volunteerProjects.length > 0 && (
  <div className={styles.projects}>
    {volunteerProjects.map((value, index) => 
      <ProjectCardWithStats project={value} key={index} />
    )}
  </div>
)}
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
