import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Цвета для диаграммы
const COLORS = ["#9b87f5", "#7E69AB", "#33C3F0", "#1EAEDB"];

// Основной компонент приложения
const EyeResearch = () => {
  return (
    <div className="app">
      <style jsx>{`
        /* Основные цвета для исследования о наследовании цвета глаз */
        :root {
          --eye-purple: #9b87f5;
          --eye-dark-purple: #7E69AB;
          --eye-light-purple: #E5DEFF;
          --eye-blue: #33C3F0;
          --eye-bright-blue: #1EAEDB;
          --background: #fdfcff;
          --foreground: #0a0911;
          --muted-foreground: #64617a;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-color: var(--background);
          color: var(--foreground);
          margin: 0;
          padding: 0;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .section-padding {
          padding: 3rem 1.5rem;
        }

        @media (min-width: 768px) {
          .section-padding {
            padding: 4rem 3rem;
          }
        }

        .eye-gradient {
          background: linear-gradient(to right, var(--eye-purple), var(--eye-blue));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .glass {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card {
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          transition: all 0.3s;
          padding: 0.75rem 1rem;
        }

        .navbar.scrolled {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .hero {
          min-height: 100vh;
          padding-top: 5rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(to bottom right, rgba(229, 222, 255, 0.3), white, white);
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-area {
          height: 320px;
          overflow-y: auto;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .grid {
          display: grid;
          gap: 1.5rem;
        }

        .grid-cols-1 {
          grid-template-columns: repeat(1, 1fr);
        }

        @media (min-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid-cols-4 {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
      <Navbar />
      <Hero />
      <InheritanceSection />
      <StatisticsSection />
      <Footer />
    </div>
  );
};

// Компонент навигационной панели
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { name: "Главная", href: "#home" },
    { name: "Наследование глаз", href: "#inheritance" },
    { name: "Статистика", href: "#statistics" },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={{ width: '24px', height: '24px', marginRight: '8px', color: 'var(--eye-purple)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--eye-purple)' }}>
                Наследование глаз
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>by mogcommunity</span>
            </div>
          </a>

          {/* Десктопное меню */}
          <div className="desktop-menu" style={{ display: 'none' }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{ 
                  color: 'var(--foreground)', 
                  opacity: 0.9, 
                  fontWeight: 500, 
                  marginLeft: '1.5rem',
                  textDecoration: 'none'
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Кнопка мобильного меню */}
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Мобильное меню */}
        <div
          className="mobile-menu"
          style={{
            display: isMenuOpen ? 'block' : 'none',
            marginTop: '1rem'
          }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)', 
            borderRadius: '0.5rem', 
            padding: '1rem' 
          }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{ 
                  color: 'var(--foreground)', 
                  opacity: 0.9, 
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  textDecoration: 'none'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Компонент героя
const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <div className="fade-in" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '1.5rem', 
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(229, 222, 255, 0.4)',
            borderRadius: '9999px'
          }}>
            <div style={{ width: '20px', height: '20px', marginRight: '0.5rem', color: 'var(--eye-purple)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--eye-dark-purple)' }}>Исследование наследования глаз</span>
          </div>
          
          <h1 className="fade-in delay-100" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--foreground)' }}>Удивительный мир </span>
            <span className="eye-gradient">наследования глаз</span>
          </h1>
          
          <p className="fade-in delay-200" style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
            color: 'var(--muted-foreground)', 
            marginBottom: '2rem', 
            maxWidth: '48rem', 
            margin: '0 auto 2rem' 
          }}>
            Изучите генетическую науку о цвете глаз, узнайте о закономерностях наследования 
            и статистических данных, собранных в нашем лицее.
          </p>
        </div>
        
        <div className="fade-in delay-400" style={{ marginTop: '4rem', width: '100%', maxWidth: '64rem', margin: '4rem auto 0' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            <img 
              src="https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80" 
              alt="Различные цвета человеческих глаз" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.5rem', color: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Разнообразие цветов глаз</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>От голубых до карих - генетическое чудо природы</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Компонент секции о наследовании
const InheritanceSection = () => {
  return (
    <section id="inheritance" className="section-padding" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.25rem)', fontWeight: 'bold', marginBottom: '1rem' }}>Наследование цвета глаз</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)' }}>
            Цвет глаз — это генетическая черта, которая наследуется от родителей. 
            Мы исследовали данное явление и сделали несколько кратких тезисов.
          </p>
        </div>

        <div className="grid grid-cols-1 grid-cols-4" style={{ marginBottom: '4rem' }}>
          <FeatureCard
            icon={<DnaIcon />}
            title="Генетика цвета глаз"
            description="Цвет глаз определяется несколькими генами, главным из которых являются OCA2 и HERC2 на хромосоме 15."
          />
          <FeatureCard
            icon={<UsersIcon />}
            title="Родительское наследование"
            description="Дети наследуют гены цвета глаз от обоих родителей, но проявление зависит от доминантности."
          />
          <FeatureCard
            icon={<GraduationCapIcon />}
            title="Научные исследования"
            description="Современные исследования показывают, что наследование цвета глаз сложнее, чем простая доминантность."
          />
          <FeatureCard
            icon={<ChartIcon />}
            title="Статистические данные"
            description="Карий цвет глаз самый распространенный в мире, голубой и зеленый встречаются реже."
          />
        </div>

        <div className="grid grid-cols-1 grid-cols-2" style={{ gap: '2rem' }}>
          <div style={{ order: 2 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Как происходит наследование цвета глаз?</h3>
            <div className="scroll-area">
              <div style={{ paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                  <strong>Цвет глаз и генетика:</strong> Наследование цвета глаз — это сложный процесс, 
                  который зависит от множества генов. Эти гены контролируют количество, тип и распределение 
                  пигмента меланина в радужной оболочке глаза.
                </p>
                <p>
                  <strong>Доминантные и рецессивные гены:</strong> Исторически считалось, что карий цвет глаз 
                  доминирует над голубым, но современная генетика показывает, что это намного сложнее. Цвет глаз 
                  зависит от нескольких генов, работающих вместе.
                </p>
                <p>
                  <strong>Ключевые гены:</strong> Основными генами, влияющими на цвет глаз, являются OCA2 и HERC2. 
                  Вариации в этих генах влияют на количество меланина в радужке, что и определяет цвет глаз.
                </p>
                <p>
                  <strong>Влияние меланина:</strong> Меланин — это пигмент, который придает цвет глазам, коже и волосам. 
                  Люди с высоким содержанием меланина в радужке имеют карие глаза, а с низким — голубые.
                </p>
                <p>
                  <strong>Неожиданные комбинации:</strong> Двое кареглазых родителей могут иметь голубоглазого ребенка, 
                  если оба являются носителями рецессивного гена голубых глаз. Это показывает, насколько сложным может быть 
                  процесс наследования.
                </p>
                <p>
                  <strong>Изменение цвета глаз:</strong> У многих младенцев глаза при рождении голубые, но с возрастом они 
                  могут потемнеть по мере накопления меланина в радужке.
                </p>
              </div>
            </div>
          </div>
          <div style={{ order: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '28rem' }}>
              <div style={{ 
                position: 'absolute', 
                left: '-1rem', 
                top: '-1rem', 
                width: '16rem', 
                height: '16rem', 
                backgroundColor: 'rgba(229, 222, 255, 0.5)', 
                borderRadius: '9999px', 
                filter: 'blur(3rem)',
                zIndex: -1 
              }}></div>
              <div style={{ 
                position: 'absolute', 
                right: '-1rem', 
                bottom: '-1rem', 
                width: '16rem', 
                height: '16rem', 
                backgroundColor: 'rgba(51, 195, 240, 0.3)', 
                borderRadius: '9999px', 
                filter: 'blur(3rem)',
                zIndex: -1 
              }}></div>
              <img
                src="https://images.unsplash.com/photo-1533636721434-0e2d61030955?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
                alt="Наследование цвета глаз"
                style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Компонент карточки функции
const FeatureCard = ({ icon, title, description }) => (
  <div className="card glass" style={{ height: '100%', transition: 'all 0.3s ease' }}>
    <div style={{ padding: '1.5rem' }}>
      <div style={{ 
        width: '3rem', 
        height: '3rem', 
        borderRadius: '0.5rem', 
        backgroundColor: 'var(--eye-light-purple)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: '1rem' 
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--muted-foreground)' }}>{description}</p>
    </div>
  </div>
);

// Компонент статистической карточки
const StatisticCard = ({ icon, title, value, suffix = "", description }) => (
  <div className="card glass" style={{ height: '100%' }}>
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ borderRadius: '9999px', padding: '0.5rem', backgroundColor: 'var(--eye-light-purple)' }}>
          {icon}
        </div>
        <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--eye-purple)' }}>
          {value}{suffix}
        </span>
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{description}</p>
    </div>
  </div>
);

// Компонент секции статистики
const StatisticsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const eyeColorData = [
    { name: "Карие", value: 51.1, color: "#7E69AB" },
    { name: "Голубые", value: 26.7, color: "#33C3F0" },
    { name: "Зеленые", value: 22.2, color: "#1EAEDB" }
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section id="statistics" className="section-padding" style={{ backgroundColor: 'rgba(229, 222, 255, 0.1)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.25rem)', fontWeight: 'bold', marginBottom: '1rem' }}>Наследование цвета глаз</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)' }}>
            Мы собрали данные о распространенности различных цветов глаз среди учащихся
            и их биологических родителей для изучения наследования этого признака.
          </p>
        </div>

        <div className="grid grid-cols-1 grid-cols-4" style={{ marginBottom: '4rem' }}>
          <StatisticCard 
            icon={<EyeIcon />}
            title="Изучено семей"
            value={45}
            description="Количество семей, принявших участие в исследовании"
          />
          <StatisticCard 
            icon={<ChartIcon />}
            title="Преобладающий цвет"
            value="51.1%"
            description="Процент учащихся с карими глазами"
          />
          <StatisticCard 
            icon={<PercentIcon />}
            title="Цветовое разнообразие"
            value={3}
            description="Основные цвета глаз: карий, голубой и зеленый"
          />
        </div>

        <div className="grid grid-cols-1 grid-cols-2" style={{ gap: '2rem', alignItems: 'center' }}>
          <div>
            <div className="glass card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Распределение цветов глаз</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eyeColorData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                      >
                        {eyeColorData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                            stroke={activeIndex === index ? "#fff" : "none"}
                            strokeWidth={2}
                            className={`transition-all duration-300 ${activeIndex === index ? "opacity-100 transform scale-105" : "opacity-80"}`}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Процент учеников"]} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        formatter={(value) => (
                          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Интересные факты о цвете глаз в нашем лицее</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: 'var(--muted-foreground)' }}>
                <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>Наследование от родителей:</span> По результатам 
                исследования, у 53.3% отцов и 37.8% матерей карие глаза, что коррелирует с высоким процентом 
                карих глаз у детей (51.1%).
              </p>
              <p style={{ color: 'var(--muted-foreground)' }}>
                <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>Распределение цветов:</span> Среди учащихся 
                преобладают карие глаза (51.1%), за ними следуют голубые (26.7%) и зеленые (22.2%).
              </p>
              <p style={{ color: 'var(--muted-foreground)' }}>
                <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>Интересный факт:</span> У матерей наблюдается 
                почти равное распределение между карими (37.8%), голубыми (31.1%) и зелеными (31.1%) глазами.
              </p>
              <p style={{ color: 'var(--muted-foreground)' }}>
                <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>Генетические тенденции:</span> Данные показывают, 
                что карий цвет глаз является доминантным признаком в исследуемой популяции.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Компонент подвала
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '2rem 0', borderTop: '1px solid #e9ecef' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '24px', height: '24px', marginRight: '0.5rem', color: 'var(--eye-purple)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--eye-purple)' }}>
              Наследование глаз
            </span>
          </div>
          <p style={{ color: 'var(--muted-foreground)', maxWidth: '32rem', marginBottom: '2rem' }}>
            Учебно-исследовательский проект, направленный на изучение наследования цвета глаз
            и популяризацию научных знаний среди учащихся.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Иконки
const DnaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--eye-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 15c6.667-6 13.333 0 20-6"></path>
    <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"></path>
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"></path>
    <path d="m17 6-2.5-2.5"></path>
    <path d="m14 8-1-1"></path>
    <path d="m7 18 2.5 2.5"></path>
    <path d="m3.5 14.5.5.5"></path>
    <path d="m20 9 .5.5"></path>
    <path d="m6.5 12.5 1 1"></path>
    <path d="m16.5 10.5 1 1"></path>
    <path d="m10 16 1.5 1.5"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--eye-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 21a8 8 0 0 0-16 0"></path>
    <circle cx="10" cy="8" r="5"></circle>
    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-10 0c-2 1.5-4 4.63-4 8"></path>
  </svg>
);

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--eye-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--eye-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"></path>
    <path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--eye-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const PercentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--eye-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 5-14 14"></path>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);

export default EyeResearch;
