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
import { getProfile } from "@/src/lib/api/profile";
import { ProjectStatusEnum } from "@/src/lib/models/export/project";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { getUserMemberships } from "@/src/lib/api/project";



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

const myProjects = [];
// const myProjects = [];
const projectParticipations = [testProjectData, testProjectData];
// const projectParticipations = [];

export default function ProfilePage() {
  // userData, myProjects, projectParticipations
  const [showScientistProjects, setShowScientistProjects] = useState(true);
  const [showVolunteerProjects, setShowVolunteerProjects] = useState(true);

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
  const [scientistProjects, setScientistProjects] = useState<MembershipProjectDTO[]>([]);
  const [volunteerProjects, setVolunteerProjects] = useState<MembershipProjectDTO[]>([]);

  const toggleScientistProjects = () => {
    setShowScientistProjects(prev => !prev);
  };

  const toggleVolunteerProjects = () => { 
    setShowVolunteerProjects(prev => !prev);
  };

  const { userId, isLoading } = useAuth();
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  useEffect(() => {
    if (isLoading || !userId) return
    async function loadProfile() {
      try {
          console.log("KARABMA!!!")
          const data = await getProfile(userId);
          const memberships = await getUserMemberships(userId);
          setUserData(data)
          setIsLoadingProfile(false);

          setScientistProjects(memberships.scientist)
          setVolunteerProjects(memberships.volunteer)
      }
      catch (error: any) { 
        console.error("Error details: ", {
          message: error.message,
          response: error.response,
        });
      }
    }
    
    loadProfile()
  }, [userId, isLoading])

  if (isLoading || isLoadingProfile) return <div className="centered">Загрузка...</div>


  // <!> This page has bad adaptivity in .headerTitle 
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
            <div className={styles.headerTitle} onClick={toggleScientistProjects}>
              <h2 className={styles.title}>Мои проекты</h2>
              { scientistProjects.length > 0 && <Image src={showScientistProjects ? ArrowDown : ArrowRight} alt="arrow-right" />}
            </div>
            { myProjects.length > 0 && <Link className="basic-link" href="/feed/create">
              <TransparentTextImageButton src={NewImage} text="Создать новый проект" color="black"/> {/** <!> color="black" распространяется на все TransparentButton на данной странице за счёт <style> */}
            </Link>}
          </div>
          { (showScientistProjects && scientistProjects.length > 0) && 
            <div className={styles.projects}>
              {scientistProjects.map((value, index) => <ProjectCard {...value} key={index} />)}
            </div>
            
            }

          {
            (scientistProjects.length == 0) && <div className={styles.noProjects}>
              <p>У вас пока что нет проектов.</p>
              <Link className="basic-link" href="/feed/create">
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
