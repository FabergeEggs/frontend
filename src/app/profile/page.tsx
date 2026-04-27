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
// const myProjects = [];
const projectParticipations = [testProjectData, testProjectData];
// const projectParticipations = [];

export default function ProfilePage() {
  // userData, myProjects, projectParticipations
  const [showMyProjects, setShowMyProjects] = useState(true);
  const [showProjectParticipations, setShowParticipatingProjects] = useState(true);

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
       setUserData(data)
       setIsLoadingProfile(false);
    }
    
    loadProfile()
  }, [userId, isLoading])

  if (isLoading || isLoadingProfile) return <div className="centered">Загрузка...</div>

  return (
    <div className="pagecontainer">
      <h2 className={styles.title}>Профиль</h2>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
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
            { myProjects.length > 0 && <Link className={styles.link} href="/feed/create">
              <TextImageButton src={NewImage} text="Создать новый проект"/>
            </Link>}
          </div>
          { (showMyProjects && myProjects.length > 0) && 
            <div className={styles.projects}>
              {myProjects.map((value, index) => <ProjectCard {...value} key={index} />)}
            </div>
            
            }

          {
            (showMyProjects && myProjects.length == 0) && <div className={styles.noProjects}>
              <p>У вас пока что нет проектов.</p>
              <Link className={styles.link} href="/feed/create">
                <button className={`basic-btn ${styles.noProjectsBtn}`}>
                  Создать проект
                </button>
              </Link>
            </div>
          }
        </div>
        <div className={styles.myProjectsContainer}>
          <div className={styles.myProjectsHeader}>
            <div className={styles.headerTitle} onClick={toggleParticipatingProjects}>
              <h2 className={styles.title}>Участие в проектах</h2>
              <Image src={showProjectParticipations ? ArrowDown : ArrowRight} alt="arrow-right" />
            </div>
            {projectParticipations.length > 0 && <Link className={styles.link} href="/feed">
              <TextImageButton src={FindImage} text="Найти новый проект"/>
            </Link>}
          </div>
          { (showProjectParticipations && projectParticipations.length > 0) && <div className={styles.projects}>
            {projectParticipations.map((value, index) => <ProjectCard {...value} key={index} />)}
            
          </div>}
          { (showProjectParticipations && projectParticipations.length == 0) && 
            <div className={styles.noProjects}>
              <p>Вы пока не участвуете ни в каких проектах.</p>
              <Link className={styles.link} href="/feed">
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
