import Instagram from "@mui/icons-material/Instagram";
import YouTube from "@mui/icons-material/YouTube";
import { IconButton } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { SpotifyIcon } from "../icons/spotify";
import { TikTokIcon } from "../icons/tik-tok";


export const SocialLinks = (props) => {
    const [socialLinks, setSocialLinks] = useState([]);
    useEffect(() => {
        try {
            const convert = JSON.parse(props.links);
            const keyValuePair = JSON.parse(convert).map((link) => {
                const key = Object.keys(link)[0] ?? "";
                return { platform: key, url: link[key] };
            });
            const socialLinksArr = keyValuePair.filter((kp) => kp.url !== "");
            setSocialLinks(socialLinksArr);
        } catch (error) {
            // console.log('error', error);
        }
    }, [props.links]);
    return (
        <>
            {socialLinks.map((social, idx) => {
                return (
                    <a key={idx} href={social?.url} target="_blank" rel="noreferrer">
                        <IconButton aria-label={social.platform} size="small">
                            {(() => {
                                switch (social?.platform) {
                                    case "Tiktok":
                                        return <TikTokIcon />;
                                    case "Youtube":
                                        return <YouTube />;
                                    case "Instagram":
                                        return <Instagram />;
                                    case "Spotify":
                                        return <SpotifyIcon />;
                                    default:
                                        return null;
                                }
                            })()}
                        </IconButton>
                    </a>
                );
            })}
        </>
    );
};
