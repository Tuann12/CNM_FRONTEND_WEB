import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import styles from './ForgotPass.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const GetPass = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const location = useLocation();

    const onSubmit = async (data) => {
        const { newPassword, confirmPassword } = data;
        const email = location.state?.email;

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/user/updatePassword/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }
            alert('Đổi mật khẩu thành công');
            navigate('/');
        } catch (error) {
            setError(error.message);
            alert(error.message || 'An error occurred! Please try again.');
        }
    };

    const schema = yup.object().shape({
        newPassword: yup.string().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu mới'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp')
            .required('Nhập lại mật khẩu'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div className={cx('container-getPass')}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 810"
                preserveAspectRatio="xMinYMin slice"
                style={{ minHeight: '100vh' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 810"
                    preserveAspectRatio="xMinYMin slice"
                    style={{ minHeight: '100vh' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 810"
                        preserveAspectRatio="xMinYMin slice"
                        style={{ minHeight: '100vh' }}
                    >
                        <path
                            fill="#aad6ff"
                            d="M592.66 0c-15 64.092-30.7 125.285-46.598 183.777C634.056 325.56 748.348 550.932 819.642 809.5h419.672C1184.518 593.727 1083.124 290.064 902.637 0H592.66z"
                        ></path>
                        <path
                            fill="#e8f3ff"
                            d="M545.962 183.777c-53.796 196.576-111.592 361.156-163.49 490.74 11.7 44.494 22.8 89.49 33.1 134.883h404.07c-71.294-258.468-185.586-483.84-273.68-625.623z"
                        ></path>
                        <path
                            fill="#cee7ff"
                            d="M153.89 0c74.094 180.678 161.088 417.448 228.483 674.517C449.67 506.337 527.063 279.465 592.56 0H153.89z"
                        ></path>
                        <path
                            fill="#e8f3ff"
                            d="M153.89 0H0v809.5h415.57C345.477 500.938 240.884 211.874 153.89 0z"
                        ></path>
                        <path
                            fill="#e8f3ff"
                            d="M1144.22 501.538c52.596-134.583 101.492-290.964 134.09-463.343 1.2-6.1 2.3-12.298 3.4-18.497 0-.2.1-.4.1-.6 1.1-6.3 2.3-12.7 3.4-19.098H902.536c105.293 169.28 183.688 343.158 241.684 501.638v-.1z"
                        ></path>
                        <path
                            fill="#eef4f8"
                            d="M1285.31 0c-2.2 12.798-4.5 25.597-6.9 38.195C1321.507 86.39 1379.603 158.98 1440 257.168V0h-154.69z"
                        ></path>
                        <path
                            fill="#e8f3ff"
                            d="M1278.31,38.196C1245.81,209.874 1197.22,365.556 1144.82,499.838L1144.82,503.638C1185.82,615.924 1216.41,720.211 1239.11,809.6L1439.7,810L1439.7,256.768C1379.4,158.78 1321.41,86.288 1278.31,38.195L1278.31,38.196z"
                        ></path>
                    </svg>{' '}
                </svg>{' '}
            </svg>
            <div className={cx('register')}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={cx('register-form-input')}>
                        <input
                            className={cx('register-form-input-text')}
                            type="password"
                            placeholder="Mật khẩu mới"
                            required
                            {...register('newPassword')}
                        />
                        {errors.newPassword && <div className={cx('error')}>{errors.newPassword.message}</div>}
                    </div>
                    <div className={cx('register-form-input')}>
                        <input
                            className={cx('register-form-input-text')}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            required
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && <div className={cx('error')}>{errors.confirmPassword.message}</div>}
                    </div>
                    <button type="submit" className={cx('btn')}>
                        Đổi mật khẩu
                    </button>
                    <br />
                    <Link to="/forgotpass" className={cx('back-forgot')}>
                        Quay lại
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default GetPass;
