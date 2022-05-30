import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './styles.scss';

const Navigation = () => {
    const { t } = useTranslation();
    const links = t("navigation", { returnObjects: true });

    return (
        <nav>
            <ul>
                {
                    Object.entries(links).map(([key, value], index) => (
                        <li key={`${key}-${index}`}>
                            <Link to={key}>{value}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

export default Navigation;