import Image from 'next/image'
import useProfile from '../hooks/useProfile';
import styles from './profile.module.css'

export default function Profile({ address }) {
  const profile = useProfile({ address });

  return (
    <div className={styles.container}>
      <a
        href={`https://universalprofile.cloud/${address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {profile?.imageUrl ? (
          <Image
            alt="Profile Image"
            src={profile.imageUrl}
            width={48}
            height={48}
          />
        ) : (
          <></>
        )}
      </a>
    </div>
  );
}
