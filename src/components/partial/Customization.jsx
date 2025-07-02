'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import {
    IconBrush,
    IconRestore,
    IconPencil,
    IconX,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { dark_version, font_jura, font_mali, font_mulish, font_quicksand, light_version, profile_av, rtl_version } from '@/assets/images';
import toast from 'react-hot-toast';
import { fetchCustomizationRequest, postCustomizationRequest, resetCustomization } from '@/Redux/features/customization/customizationSlice';
import { useFavicon } from '../utils/useFavicon';

const CustomizationSettings = (props) => {
    const {
        localCustomizations,
        setLocalCustomizations,
        settingToggle,
        toggleThemeSetting,
        toggleDarkMode
    } = props;
    const dispatch = useDispatch();
    const { customizationData, customizationPostData, customizationResetData } = useSelector((state) => state.customization);
    // console.log("🚀 ~ CustomizationSettings ~ customizationData:", customizationData)
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (localCustomizations) {
            setLocalCustomizations({
                ...localCustomizations,
                dynamicFont: {
                    fontUrl: localCustomizations.dynamicFont?.fontUrl || "",
                    fontLink: localCustomizations.dynamicFont?.fontLink || ""
                }
            });
        }
    }, []);

    const colorItem = [
        {
            name: "indigo",
            color: "bg-theme-indigo",
        },
        {
            name: "blue",
            color: "bg-theme-blue",
        },
        {
            name: "cyan",
            color: "bg-theme-cyan",
        },
        {
            name: "green",
            color: "bg-theme-green",
        },
        {
            name: "orange",
            color: "bg-theme-orange",
        },
        {
            name: "blush",
            color: "bg-theme-blush",
        },
        {
            name: "red",
            color: "bg-theme-red",
        },
        {
            name: "dynamic",
            color: "bg-primary-10",
            icon: IconBrush,
        },
    ]

    const [dynamicColorItem, setDynamicColorItem] = useState([
        {
            color: "bg-primary",
            label: "Primary Color",
            variable: "--color-primary",
        },
        {
            color: "bg-secondary",
            label: "Secondary Color",
            variable: "--color-secondary",
        },
        {
            color: "bg-body-color",
            label: "Body Background",
            variable: "--color-body-color",
        },
        {
            color: "bg-card-color",
            label: "Card Background",
            variable: "--color-card-color",
        },
        {
            color: "bg-border-color",
            label: "Border Color",
            variable: "--color-border-color",
        },
        {
            color: "bg-chart-color1",
            label: "Chart Color 1",
            variable: "--color-chart-color1",
        },
        {
            color: "bg-chart-color2",
            label: "Chart Color 2",
            variable: "--color-chart-color2",
        },
        {
            color: "bg-chart-color3",
            label: "Chart Color 3",
            variable: "--color-chart-color3",
        },
        {
            color: "bg-chart-color4",
            label: "Chart Color 4",
            variable: "--color-chart-color4",
        },
        {
            color: "bg-chart-color5",
            label: "Chart Color 5",
            variable: "--color-chart-color5",
        },
    ])

    const fontItem = [
        {
            image: font_mali,
            font: "Mali, sans-serif"
        },
        {
            image: font_quicksand,
            font: "Quicksand, sans-serif"
        },
        {
            image: font_mulish,
            font: "Mulish, sans-serif"
        },
        {
            image: font_jura,
            font: "Jura, sans-serif"
        },
    ]

    // In your component, use the hook with the schoolLogo
    const setFavicon = useFavicon();
    useEffect(() => {
        setFavicon(localCustomizations.schoolLogo || '/Techvein_logo.png');
    }, [localCustomizations.schoolLogo, setFavicon]);

    // Also update the handleFileChange function to save to localStorage:
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newLogo = reader.result;
                setLocalCustomizations(prev => ({
                    ...prev,
                    schoolLogo: newLogo
                }));
                setFavicon(newLogo);
                // Save to localStorage
                const savedCustomizations = JSON.parse(localStorage.getItem('customizations') || {});
                localStorage.setItem('customizations', JSON.stringify({
                    ...savedCustomizations,
                    schoolLogo: newLogo
                }));

                // Favicon will update automatically through the hook
            };
            reader.readAsDataURL(file);
        }
    };

    // Theme Setting
    const handleThemeChange = (name) => {
        setLocalCustomizations((prev) => ({
            ...prev,
            theme: name,
        }));
        document.body.setAttribute("data-swift-theme", name);
    };

    useEffect(() => {
        document.body.setAttribute("data-swift-theme", localCustomizations.theme);
    }, [localCustomizations.theme]);

    // dynamic color setting
    const handleChangeDynamicColor = (newColor, index) => {
        const updatedDynamicColorItem = [...dynamicColorItem];
        updatedDynamicColorItem[index].colorValue = newColor.rgb;
        setDynamicColorItem(updatedDynamicColorItem);
        updateCssVariable(updatedDynamicColorItem[index].variable, newColor.rgb);
    };
    const handleClickDynamicColor = (index) => {
        const updatedDynamicColorItem = [...dynamicColorItem];
        updatedDynamicColorItem[index].displayColorPicker = !updatedDynamicColorItem[index].displayColorPicker;
        setDynamicColorItem(updatedDynamicColorItem);
    };
    const handleCloseDynamicColor = (index) => {
        const updatedDynamicColorItem = [...dynamicColorItem];
        updatedDynamicColorItem[index].displayColorPicker = false;
        setDynamicColorItem(updatedDynamicColorItem);
    };
    const updateCssVariable = (variable, color) => {
        document.documentElement.style.setProperty(variable, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    };

    // rtl mode
    const toggleRtlMode = () => {
        const newRtlMode = !localCustomizations.rtlMode;
        setLocalCustomizations((prev) => ({
            ...prev,
            rtlMode: newRtlMode,
        }));
        document.documentElement.setAttribute("dir", newRtlMode ? "rtl" : "ltr");
    };
    useEffect(() => {
        document.documentElement.setAttribute('dir', localCustomizations.rtlMode ? 'rtl' : 'ltr');
    }, [localCustomizations.rtlMode]);

    // font family setting
    const toggleFontFamily = (fontFamily) => {
        setLocalCustomizations((prev) => ({
            ...prev,
            fontFamily: fontFamily,
        }));
        document.body.style.setProperty("--font-family", fontFamily);
    };

    // dynamic font setting
    const handleApply = () => {
        const { fontUrl, fontLink } = localCustomizations.dynamicFont || { fontUrl: '', fontLink: '' };

        if (fontUrl) {
            const link = document.createElement('link');
            link.href = fontUrl;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        if (fontLink) {
            document.body.style.setProperty("--font-family", fontLink);
            setLocalCustomizations(prev => ({
                ...prev,
                fontFamily: fontLink
            }));
        }
    };

    // Clear Font 
    const handleClear = () => {
        const fontUrl = localCustomizations.dynamicFont?.fontUrl || '';
        if (fontUrl) {
            const link = document.querySelector(`link[href="${fontUrl}"]`);
            if (link) {
                link.remove();
            }
        }

        // Reset font-family CSS variable
        document.body.style.setProperty("--font-family", "");

        // Clear dynamicFont
        setLocalCustomizations(prev => ({
            ...prev,
            dynamicFont: {
                fontUrl: "",
                fontLink: ""
            },
            fontFamily: localCustomizations.fontFamily // Reset to default font
        }));
    };

    useEffect(() => {
        document.body.style.setProperty("--font-family", localCustomizations.fontFamily);
    }, [localCustomizations.fontFamily]);

    // border radius setting
    const radiusToggle = () => {
        setLocalCustomizations((prev) => ({
            ...prev,
            showRadius: !prev.showRadius
        }));
        document.body.classList.toggle("radius-0");
    };

    // box shadow setting
    const cardShadow = document.querySelectorAll(".card")
    const shadowToggle = () => {
        setLocalCustomizations((prev) => ({
            ...prev,
            showShadow: !prev.showShadow
        }));
        cardShadow.forEach(card => {
            card.classList.toggle("shadow-shadow-sm");
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create the customizations object with all settings
            const customizationsPayload = {
                schoolLogo: localCustomizations.schoolLogo,
                schoolName: localCustomizations.schoolName,
                heading: localCustomizations.heading,
                motto: localCustomizations.motto,
                quote: localCustomizations.quote,
                motto2: localCustomizations.motto2,
                quote2: localCustomizations.quote2,
                theme: localCustomizations.theme,
                darkMode: localCustomizations.darkMode,
                rtlMode: localCustomizations.rtlMode,
                fontFamily: localCustomizations.fontFamily,
                dynamicFont: localCustomizations.dynamicFont,
                showRadius: localCustomizations.showRadius,
                showShadow: localCustomizations.showShadow,
                dynamicColors: dynamicColorItem.reduce((acc, item) => {
                    acc[item.label.toLowerCase().replace(/\s+/g, '')] = item.colorValue;
                    return acc;
                }, {})
            };
            dispatch(postCustomizationRequest({ data: customizationsPayload, token }));
        } catch (err) {
            console.error("Error submitting data:", err);
            toast.error(err?.message || "Failed to submit data. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (customizationPostData) {
            dispatch(fetchCustomizationRequest('000001'));
        }
    }, [customizationPostData]);
    useEffect(() => {
        if (customizationResetData) {
            dispatch(fetchCustomizationRequest('000001'));
            dispatch(postCustomizationRequest({ data: customizationData, token }));
        }
    }, [customizationResetData]);

    const handleReset = () => {
        dispatch(resetCustomization());
        console.log("🚀 ~ handleReset ~ customizationData:", customizationData)
        // setLocalCustomizations(customizationData?.customizationData);
        // setDynamicColorItem(dynamicColorItem.map(item => ({
        //     ...item,
        //     colorValue: customizationData?.customizationData?.dynamicColors[item?.label?.toLowerCase().replace(/\s+/g, '')],
        //     displayColorPicker: false
        // })));
        // toast.success('Customizations reset to default', { position: 'top-right' });
        // setFavicon('/Techvein_logo.png');
        // document.body.setAttribute("data-swift-theme", customizationData?.customizationData?.theme);
        // document.documentElement.setAttribute('data-theme', customizationData?.customizationData?.darkMode ? 'dark' : 'light');
        // document.documentElement.setAttribute('dir', customizationData?.customizationData?.rtlMode ? 'rtl' : 'ltr');
        // document.body.style.setProperty("--font-family", customizationData?.customizationData?.fontFamily);
        // if (customizationData?.customizationData?.showRadius) {
        //     document.body.classList.remove("radius-0");
        // } else {
        //     document.body.classList.add("radius-0");
        // }
        // document.querySelectorAll(".card").forEach(card => {
        //     if (customizationData?.customizationData?.showShadow) {
        //         card.classList.add("shadow-shadow-sm");
        //     } else {
        //         card.classList.remove("shadow-shadow-sm");
        //     }
        // });
    };

    return (
        <div className={`fixed top-0 bg-card-color z-[5] h-svh w-full max-w-[500px] transition-all duration-200 ${settingToggle ? 'ltr:right-0 rtl:left-0' : 'ltr:-right-full rtl:-left-full'}`}>
            <div className='md:px-6 px-4 md:py-4 py-3 flex items-center justify-between gap-[15px] border-b border-border-color'>
                <div className='text-[20px]/[30px] font-medium'>
                    Customizations Setting
                </div>
                <div className='flex items-center gap-2'>
                    <div className="relative group">
                        <button className='btn'
                            onClick={handleReset}
                        >
                            <IconRestore />
                        </button>
                        <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition">
                            Reset Settings
                        </span>
                    </div>
                    <div className="relative group">
                        <button onClick={toggleThemeSetting}>
                            <IconX />
                        </button>
                        <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition">
                            Close
                        </span>
                    </div>
                </div>
            </div>

            <div className='md:p-6 p-4 md:h-[calc(100svh-63px-75px)] h-[calc(100svh-55px-67px)] overflow-auto no-scrollbar'>
                <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                    <div className='flex justify-between'>
                        <label className='inline-block font-semibold mb-2'>
                            Admin Image:
                        </label>
                        <div className='sm:w-[120px] sm:h-[120px] sm:min-w-[120px] w-[100px] h-[100px] min-w-[100px] relative'>
                            <Image
                                src={localCustomizations?.schoolLogo || profile_av}
                                alt='avatar'
                                width={"120"}
                                height={"120"}
                                className='w-full h-full object-cover rounded-xl'
                            />
                            <button className='absolute right-2 top-2 p-2 shadow-lg bg-white rounded-full transform translate-x-1/2 -translate-y-1/2'>
                                <input
                                    type='file'
                                    id='editProfile'
                                    onChange={handleFileChange}
                                    className='opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer'
                                />
                                <label htmlFor='editProfile' className='opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer' />
                                <IconPencil className='w-[16px] h-[16px]' />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                    <span className='inline-block font-semibold mb-4'>
                        Admin Name:
                    </span>
                    <div className='mb-2 form-control'>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            id="font_url"
                            value={localCustomizations?.schoolName || ''}
                            onChange={(e) => {
                                const words = e.target.value.trim().split(/\s+/);
                                // Limit to 20 words (adjust the number as needed)
                                if (words.length <= 20) {
                                    setLocalCustomizations({ ...localCustomizations, schoolName: e.target.value });
                                }
                            }}
                            // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                            className="form-input"
                        />
                    </div>

                </div>
                <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                    <span className='inline-block font-semibold mb-4'>
                        Admin Title Display:
                    </span>
                    <div className='mb-2 form-control'>
                        <label className="form-label">Heading</label>
                        <input
                            type="text"
                            id="font_url"
                            value={localCustomizations?.heading}
                            onChange={(e) => {
                                const words = e.target.value.trim().split(/\s+/);
                                // Limit to 20 words (adjust the number as needed)
                                if (words.length <= 20) {
                                    setLocalCustomizations({ ...localCustomizations, heading: e.target.value });
                                }
                            }}
                            // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                            className="form-input"
                        />
                    </div>

                </div>
                <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                    <span className='inline-block font-semibold mb-4'>
                        Admin Motto/Quote Display:
                    </span>
                    <div className='mb-2 form-control'>
                        <label className="form-label">Motto</label>
                        <input
                            type="text"
                            id="font_url"
                            value={localCustomizations?.motto}
                            onChange={(e) => {
                                const words = e.target.value.trim().split(/\s+/);
                                // Limit to 20 words (adjust the number as needed)
                                if (words.length <= 20) {
                                    setLocalCustomizations({ ...localCustomizations, motto: e.target.value });
                                }
                            }}
                            // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                            className="form-input"
                        />
                        <label className="form-label">Quote</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Leave a Quote here"
                            rows="4"
                            value={localCustomizations?.quote}
                            onChange={(e) => {
                                const words = e.target.value.trim().split(/\s+/);
                                // Limit to 20 words (adjust the number as needed)
                                if (words.length <= 20) {
                                    setLocalCustomizations({ ...localCustomizations, quote: e.target.value });
                                }
                            }}
                        />
                    </div>
                    <div className='mb-4 form-control'>
                        <label className="form-label">Motto 2</label>
                        <input
                            type="text"
                            id="font_url"
                            value={localCustomizations?.motto2}
                            onChange={(e) => {
                                const words = e.target.value.trim().split(/\s+/);
                                // Limit to 20 words (adjust the number as needed)
                                if (words.length <= 20) {
                                    setLocalCustomizations({ ...localCustomizations, motto2: e.target.value });
                                }
                            }}
                            // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                            className="form-input"
                        />
                        <label className="form-label">Quote 2</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Leave a Quote here"
                            rows="4"
                            value={localCustomizations?.quote2}
                            onChange={(e) => {
                                const words = e.target.value.trim().split(/\s+/);
                                // Limit to 20 words (adjust the number as needed)
                                if (words.length <= 20) {
                                    setLocalCustomizations({ ...localCustomizations, quote2: e.target.value });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='relative mb-6 md:p-4 py-4 px-3 border border-dashed border-primary rounded-xl'>
                    <span className='inline-block bg-card-color px-[5px] font-semibold text-primary absolute -top-3'>
                        Color Setting
                    </span>
                    <ul className='flex gap-2'>
                        {colorItem?.map((item, key) => (
                            <li
                                key={key}
                                onClick={() => handleThemeChange(item?.name)}
                                className={`sm:w-[30px] w-[24px] sm:h-[26px] h-[20px] rounded-md flex items-center justify-center relative cursor-pointer ${item?.color} ${localCustomizations?.theme === item?.name ? 'after:absolute after:-left-1 after:-top-1 sm:after:w-[38px] after:w-[32px] sm:after:h-[34px] after:h-[28px] after:rounded-md after:border after:border-primary' : ''}`}
                            >
                                {item?.icon && <item.icon className='stroke-[1.5] w-[20px] h-[20px] cursor-pointer' />}
                            </li>
                        ))}
                    </ul>
                    <div className='dynamic-color-setting relative md:p-4 py-4 px-3 border border-dashed border-primary rounded-xl mt-6'>
                        <span className='inline-block bg-card-color px-[5px] font-semibold text-primary absolute -top-3'>
                            Dynamic Color Setting
                        </span>
                        <ul className='sm:columns-2 gap-2'>
                            {dynamicColorItem?.map((item, index) => (
                                <li key={index}>
                                    <div className='flex items-center gap-2'>
                                        <button
                                            className={`w-[26px] h-[16px] rounded-md border border-border-color ${item?.color}`}
                                            onClick={() => handleClickDynamicColor(index)}
                                        ></button>
                                        <label>
                                            {item?.label}
                                        </label>
                                    </div>
                                    {item.displayColorPicker && (
                                        <div className='absolute z-[2]'>
                                            <div onClick={() => handleCloseDynamicColor(index)} className='fixed top-0 right-0 bottom-0 left-0' />
                                            <ChromePicker color={item?.colorValue} onChange={(newColor) => handleChangeDynamicColor(newColor, index)} />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='relative mb-6 md:p-4 py-4 px-3 border border-dashed border-border-color rounded-xl'>
                    <span className='inline-block bg-card-color px-[5px] font-semibold absolute -top-3'>
                        Light/Dark & RTL Mode
                    </span>
                    <div className='flex'>
                        <div
                            onClick={toggleDarkMode}
                            className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${!localCustomizations?.darkMode ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                        >
                            <Image src={light_version} alt='light version' width={300} height={168} />
                        </div>
                        <div
                            onClick={toggleDarkMode}
                            className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${localCustomizations?.darkMode ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                        >
                            <Image src={dark_version} alt='dark version' width={300} height={168} />
                        </div>
                        <div
                            onClick={toggleRtlMode}
                            className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${localCustomizations?.rtlMode ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                        >
                            <Image src={rtl_version} alt='rtl version' width={300} height={168} />
                        </div>
                    </div>
                </div>
                <div className='relative mb-6 md:p-4 py-4 px-3 border border-dashed border-border-color rounded-xl'>
                    <span className='inline-block bg-card-color px-[5px] font-semibold absolute -top-3'>
                        Google Font Setting
                    </span>
                    <div className='flex'>
                        {fontItem?.map((item, key) => (
                            <div
                                key={key}
                                onClick={() => toggleFontFamily(item?.font)}
                                className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${localCustomizations?.fontFamily === item?.font ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                            >
                                <Image src={item?.image} alt='font mali' width={79} height={44} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                    <span className='inline-block font-semibold mb-4'>
                        Dynamic Font Setting
                    </span>
                    <div className='mb-2 form-control'>
                        <label className="form-label">Enter font URL</label>
                        <input
                            type="text"
                            id="font_url"
                            value={localCustomizations?.dynamicFont?.fontUrl || ""}
                            onChange={(e) =>
                                setLocalCustomizations({
                                    ...localCustomizations,
                                    dynamicFont: {
                                        ...localCustomizations?.dynamicFont,
                                        fontUrl: e.target.value
                                    }
                                })
                            }
                            className="form-input"
                            placeholder="http://fonts.cdnfonts.com/css/vonfont"
                        />
                    </div>
                    <div className='mb-4 form-control'>
                        <label className="form-label">Enter font family name</label>
                        <input
                            type="text"
                            id="font_family"
                            value={localCustomizations?.dynamicFont?.fontLink || ""}
                            onChange={(e) =>
                                setLocalCustomizations({
                                    ...localCustomizations,
                                    dynamicFont: {
                                        ...localCustomizations?.dynamicFont,
                                        fontLink: e.target.value
                                    }
                                })
                            }
                            placeholder="vonfont"
                            className="form-input"
                        />
                    </div>
                    <div className='flex items-start gap-[5px]'>
                        <button
                            onClick={handleApply}
                            className='btn btn-primary'
                        >
                            Apply Font
                        </button>
                        <button
                            onClick={handleClear}
                            className='btn btn-secondary'
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div>
                    <div className='mb-[5px]'>
                        More Setting
                    </div>
                    <ul>
                        <li className='py-3 px-4 border-b border-dashed border-border-color hover:bg-primary-10'>
                            <div className="form-check form-switch">
                                <input
                                    type="checkbox"
                                    id="radius_checkbox"
                                    onChange={radiusToggle}
                                    checked={localCustomizations?.showRadius}
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="radius_checkbox">Border Radius</label>
                            </div>
                        </li>
                        <li className='py-3 px-4 hover:bg-primary-10'>
                            <div className="form-check form-switch">
                                <input
                                    type="checkbox"
                                    id="shadow_checkbox"
                                    onChange={shadowToggle}
                                    checked={localCustomizations?.showShadow}
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="shadow_checkbox">Card Box-Shadow</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='md:px-6 px-4 md:py-4 py-3 flex items-center gap-[10px] border-t border-border-color'>
                <button className='btn btn-primary w-full'
                    onClick={handleSubmit}
                >
                    Save Changes
                </button>
                <button className='btn btn-white !border-border-color w-full'
                    onClick={toggleThemeSetting}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CustomizationSettings;