"use client"
import React from 'react'
import styles from '../Stylesheet/AuthBackground.module.css'

const AuthBackground = () => {
    return (
        <div className={styles.particlesContainer}>
            <div className={`${styles.glowBlob} ${styles.blob1}`}></div>
            <div className={`${styles.glowBlob} ${styles.blob2}`}></div>
            
            {[...Array(20)].map((_, i) => (
                <div key={i} className={styles.particle}></div>
            ))}
        </div>
    )
}

export default AuthBackground
