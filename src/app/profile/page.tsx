"use client"

import styles from "./profilepage.module.css";
import ProfilePictureInput from "@/src/ui/inputs/ProfilePictureInput/ProfilePictureInput";
import ProfileForm from "@/src/ui/forms/ProfileForm/ProfileForm";
import Image from "next/image";
import TextImageButton from "@/src/ui/buttons/TextImageButton/TextImageButton";
import ProjectCard from "@/src/ui/info/ProjectCard/ProjectCard";
import Link from "next/link";

import ArrowRight from "@/public/assets/arrow-right.svg"
import ArrowDown from "@/public/assets/arrow-down.svg"
import NewImage from "@/public/assets/profile/new.svg"
import FindImage from "@/public/assets/profile/find.svg"

import { useState, useEffect } from "react";
import { getProfile } from "@/src/lib/api/profile";
import { ProjectStatusEnum } from "@/src/lib/models/export/project";
import { useAuth } from "@/src/lib/providers/AuthProvider";



const testProjectData = {
    id: "kek",
    label: "Перепись населения в городе Ижевск",
    creator: "Somewho",
    short_description:
      "В связи с приходом весны жители Буммаша начали активно почковаться, внося диссонанс в статистику населения столицы России. С целью обновления статистических данных нам необходимо собрать информацию о текущем населении Ижевска. Вы можете помочь нам, ведь вам понадобиться лишь простой советский...",
    description: "kek",
    tags: ["Урбанистика", "Кириешки"],
    created_at: new Date(2026, 3, 16), // April 16, 2026 (months are 0-based)
    updated_at: new Date(),
    status: ProjectStatusEnum.ACTIVE,

    tasks_count: 16,
    participants_count: 17,
    answers_count: 128,
  };

const myProjects = [testProjectData];
const projectParticipations = [testProjectData, testProjectData];

export default function ProfilePage() {
  // userData, myProjects, projectParticipations
  const [showMyProjects, setShowMyProjects] = useState(true);
  const [showParticipatingProjects, setShowParticipatingProjects] = useState(true);

  const [userData, setUserData] = useState<ProfileDTO>({
    id: "",
    user_id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    bio: "",
    avatar_url: "",
    created_at: new Date(),
    is_active: true
  });

  const toggleProjects = () => {
    setShowMyProjects(prev => !prev);
  };

  const toggleParticipatingProjects = () => { 
    setShowParticipatingProjects(prev => !prev);
  };

  const { userId, isLoading } = useAuth();
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  useEffect(() => {
    if (isLoading || !userId) return
    async function loadProfile() {
      const data = await getProfile(userId);
       console.log("USER LOADED!: ", data);
       setUserData(data)
       setIsLoadingProfile(false);
    }
    
    // 
    loadProfile()
  }, [userId, isLoading])

  if (isLoading || isLoadingProfile) return <div className="centered">Загрузка...</div>

  return (
    <div className="pagecontainer">
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <h2 className={styles.title}>Профиль</h2>
          <ProfileForm data={userData}/>
        </div>
        <div className={styles.pictureInputContainer}>
          <ProfilePictureInput  />
        </div>
      </div>
      <div className={styles.projectsContainer}>
        <div className={styles.myProjectsContainer}>
          <div className={styles.myProjectsHeader}>
            <div className={styles.headerTitle} onClick={toggleProjects}>
              <h2 className={styles.title}>Мои проекты</h2>
              <Image src={showMyProjects ? ArrowDown : ArrowRight} alt="arrow-right" />
            </div>
            <Link className={styles.link} href="/feed/create">
              <TextImageButton src={NewImage} text="Создать новый проект"/>
            </Link>
          </div>
          { showMyProjects && <div className={styles.projects}>
            {myProjects.map((value, index) => <ProjectCard {...value} key={index} />)}
            </div>}
        </div>
        <div className={styles.myProjectsContainer}>
          <div className={styles.myProjectsHeader}>
            <div className={styles.headerTitle} onClick={toggleParticipatingProjects}>
              <h2 className={styles.title}>Участие в проектах</h2>
              <Image src={showParticipatingProjects ? ArrowDown : ArrowRight} alt="arrow-right" />
            </div>
            <Link className={styles.link} href="/feed">
              <TextImageButton src={FindImage} text="Найти новый проект"/>
            </Link>
          </div>
          { showParticipatingProjects && <div className={styles.projects}>
            {projectParticipations.map((value, index) => <ProjectCard {...value} key={index} />)}
            
          </div>}
        </div>
      </div>
    </div>
  );
}
