import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Spinner,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { getSkills, type Skill } from '@/shared/api';
import { addToast } from '@heroui/react';

import { Header } from '@/widgets/header';

const MOCK_SKILLS_FALLBACK: Skill[] = [
  { id: '1', name: 'JavaScript', category: 'Programming', code: 'JS' },
  { id: '2', name: 'React', category: 'Frontend', code: 'REACT' },
  { id: '3', name: 'TypeScript', category: 'Programming', code: 'TS' },
  { id: '4', name: 'Node.js', category: 'Backend', code: 'NODE' },
  { id: '5', name: 'Python', category: 'Programming', code: 'PY' },
];

const MOCK_DEPARTMENTS = [
  { id: 'dept_01', name: 'Институт информационных технологий' },
  { id: 'dept_02', name: 'Институт экономики' },
  { id: 'dept_03', name: 'Институт права' },
];

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Петров Иван Иванович',
    userEmail: 'ivan@example.com',
    studentIdNum: '12345',
    departmentId: 'dept_01',
    position: 'Старший преподаватель',
    role: 'student',
  });

  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');

  const isStudent = profileData.role === 'student';
  const fullName = profileData.fullName;
  const userEmail = profileData.userEmail;
  const studentIdNum = profileData.studentIdNum;
  const departmentId = profileData.departmentId;
  const position = profileData.position;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        if (response.error) {
          throw new Error('Ошибка загрузки навыков');
        }
        setAllSkills(response.data || []);

        // TODO: здесь потом загрузим навыки пользователя через getUsersMeSkills
        // Пока используем моки для userSkills
        setUserSkills(MOCK_SKILLS_FALLBACK.slice(0, 3));
      } catch (error) {
        console.error('Ошибка загрузки навыков:', error);

        // HACK: Если API не работает, используем моки
        setAllSkills(MOCK_SKILLS_FALLBACK);
        setUserSkills(MOCK_SKILLS_FALLBACK.slice(0, 3));
        addToast({
          title: 'Внимание',
          description: 'Используются демо-навыки (API недоступно)',
          color: 'warning',
        });
      } finally {
        setIsLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  const handleAddSkill = () => {
    if (!selectedSkillId) return;

    const skillToAdd = allSkills.find((s) => s.id === selectedSkillId);
    if (skillToAdd && !userSkills.some((s) => s.id === skillToAdd.id)) {
      setUserSkills([...userSkills, skillToAdd]);
      // TODO: вызвать API postUsersMeSkills
    }

    setSelectedSkillId('');
    setIsAddingSkill(false);
  };

  const handleRemoveSkill = (skillId: string | undefined) => {
    if (!skillId) return;
    setUserSkills(userSkills.filter((s) => s.id !== skillId));
    // TODO: вызвать API deleteUsersMeSkills
  };

  const handleSave = () => {
    // TODO: вызвать API patchUsersMe
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="pt-12">
            <h1 className="text-6xl font-bold leading-none mb-12 text-gray-900">Личный кабинет</h1>

            <Card
              className="mb-8"
              classNames={{
                base: 'border border-[#D4D4D8] bg-white/50 rounded-[30px] shadow-none',
              }}
            >
              <CardBody className="p-6">
                <div className="flex justify-end items-center mb-4">
                  <Button color="primary" variant="light" size="sm" radius="full" onPress={() => setIsEditing(true)}>
                    + Редактировать профиль
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0D8ABC&color=fff&bold=true`}
                      className="w-24 h-24 text-large"
                      isBordered
                      color="primary"
                    />
                    <Button color="primary" variant="flat" size="sm" radius="full">
                      Сменить фото
                    </Button>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-semibold text-gray-900">{fullName}</h2>
                    <p className="text-default-500">{userEmail}</p>
                    <Chip color="default" variant="faded" size="sm" className="mt-2 capitalize">
                      {isStudent ? 'Студент' : 'Преподаватель'}
                    </Chip>

                    <Divider className="my-4" />

                    <div className="space-y-2">
                      {isStudent ? (
                        <>
                          <div>
                            <p className="text-sm text-default-500">Номер студенческого</p>
                            <p className="font-medium">{studentIdNum}</p>
                          </div>
                          <div>
                            <p className="text-sm text-default-500">Кафедра</p>
                            <p className="font-medium">
                              {MOCK_DEPARTMENTS.find((d) => d.id === departmentId)?.name || departmentId}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-sm text-default-500">Должность</p>
                            <p className="font-medium">{position}</p>
                          </div>
                          <div>
                            <p className="text-sm text-default-500">Кафедра</p>
                            <p className="font-medium">
                              {MOCK_DEPARTMENTS.find((d) => d.id === departmentId)?.name || departmentId}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card
              className="mb-0"
              classNames={{
                base: 'border border-[#D4D4D8] bg-white/50 rounded-[30px] shadow-none',
              }}
            >
              <CardBody className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Навыки</h3>
                  <Button
                    color="primary"
                    variant="light"
                    size="sm"
                    radius="full"
                    onPress={() => setIsAddingSkill(true)}
                  >
                    + Добавить навык
                  </Button>
                </div>
                <Divider className="mb-4" />

                {isLoadingSkills ? (
                  <div className="flex justify-center py-8">
                    <Spinner color="primary" />
                  </div>
                ) : userSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userSkills.map((skill) => (
                      <Chip
                        key={skill.id}
                        color="default"
                        variant="faded"
                        size="lg"
                        radius="full"
                        onClose={() => handleRemoveSkill(skill.id)}
                        classNames={{
                          content: 'font-medium text-sm',
                          closeButton: 'hover:bg-primary/20',
                        }}
                      >
                        {skill.name}
                      </Chip>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-default-500 mb-3">У вас пока нет добавленных навыков</p>
                    <Button color="primary" variant="flat" size="sm" onPress={() => setIsAddingSkill(true)}>
                      Добавить первый навык
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>

            <div className="pb-24"></div>
          </div>
        </div>
      </main>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} size="2xl" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Редактировать профиль</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input
                    label="ФИО"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  />
                  <Input
                    label="Email"
                    value={profileData.userEmail}
                    onChange={(e) => setProfileData({ ...profileData, userEmail: e.target.value })}
                  />
                  {isStudent && (
                    <Input
                      label="Номер студенческого"
                      value={profileData.studentIdNum}
                      onChange={(e) => setProfileData({ ...profileData, studentIdNum: e.target.value })}
                    />
                  )}
                  {!isStudent && (
                    <Input
                      label="Должность"
                      value={profileData.position}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    />
                  )}
                  <Select
                    label="Кафедра"
                    selectedKeys={profileData.departmentId ? new Set([profileData.departmentId]) : new Set()}
                    onChange={(e) => setProfileData({ ...profileData, departmentId: e.target.value })}
                  >
                    {MOCK_DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Отмена
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Сохранить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddingSkill} onClose={() => setIsAddingSkill(false)} size="lg" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Добавить навык</ModalHeader>
              <ModalBody>
                <Select
                  label="Выберите навык"
                  placeholder="Начните вводить название навыка"
                  selectedKeys={selectedSkillId ? new Set([selectedSkillId]) : new Set()}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  isRequired
                >
                  {allSkills
                    .filter((skill) => !userSkills.some((us) => us.id === skill.id))
                    .map((skill) => (
                      <SelectItem key={skill.id}>
                        {skill.name} {skill.category && `(${skill.category})`}
                      </SelectItem>
                    ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Отмена
                </Button>
                <Button color="primary" onPress={handleAddSkill} isDisabled={!selectedSkillId}>
                  Добавить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
