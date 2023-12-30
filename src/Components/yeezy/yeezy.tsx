import "../../App.css";
import "./yeezy.css";
import yeezyBoots from "../../data/yeezyBoots.tsx";
import React, { useEffect, useState, useRef, Children } from "react";
import {
  useSpring, 
  useScroll,
  useInView,
  motion,
  AnimatePresence,
  animate,
  stagger,
  useAnimate,
  useMotionValueEvent,
  inView
} from "framer-motion";

interface YeezyBootsProps  {
  start: number;
  end: number;
}

const randomOffsets = Array.from({ length: 13 }, () => Math.random() * 100 - 50);
function Yeezy_Boots( {start, end}: YeezyBootsProps) {
  const parentVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };

  const childVariant = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * index,
      }
    }),
  };

  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);

  const ref = useRef(null)
  const { scrollYProgress: number } = useScroll({
    target: ref,
    offset: ["start end", "0.5"]
  })
  

}

const collectionDescVariant = {
  initial: {
    opacity: 0,
    scale: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.2, type: "tween"
    }
  },
};

const collectionDescVariantReversed = {
  initial: {
    opacity: 0,
    scale: 0,
    y: -700,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: -900,
    transition: {
      delay: 0.4,
      duration: 0.2, type: "tween"
    }
  },
};


const collectionTitleVariant = {
  initial: {
    y: 0
  },
  animate: {
    y: -770,
    transition: { 
    duration: 0.3,         
    type: "spring",
  }
  },
};


function Yeezy() {
  
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "0.5"]
  })
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })

  const [hoverStates, setHoverStates] = useState({
    wrapper1: false,
    wrapper2: false,
    wrapper3: false,
    wrapper4: false,
    wrapper5: false,
    wrapper6: false,
  });
  
  
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [hoverEffectEnabled, setHoverEffectEnabled] = useState<boolean>(true);

  const [selectedBoot, setSelectedBoot] = useState(null);
  const handleBootClick = (bootId: any) => {
    setSelectedBoot(bootId);
  };


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setHoverEffectEnabled(windowWidth > 431);
  }, [windowWidth]);

  const handleMouseEnter = (wrapperId: string) => {
    if (!hoverEffectEnabled) return;
    setHoverStates({
      wrapper1: false,
      wrapper2: false,
      wrapper3: false,
      wrapper4: false,
      wrapper5: false,
      wrapper6: false,
      [wrapperId]: true
    });
    console.log('Mouse entered');
  };

  const handleMouseLeave = (wrapperId: string) => {
    if (!hoverEffectEnabled) return;
    setHoverStates(prevStates => ({
      ...prevStates,
      [wrapperId]: false
    }));
    console.log('Mouse left');
  };


  return (
    <AnimatePresence>
      <motion.div className="yeezy" style={{ translateX: scrollYProgress }}
      id="yeezy"
      >
        <div className="yeezy_container">
          <div className="yeezy-wrapper">
            <div className="title_wrapper">
              <h1>The Most Iconic Yeezy Collections</h1>
              <button className="title_button"  style={{ opacity: hoverStates['wrapper2'] ? 0 : 1 }}><a href={'https://www.yeezy.com/'} target="_blank">Read More About Yeezy</a></button>
            </div>
          </div>
          <div className="yeezy_collections_container">
            <motion.div className="collection-wrapper"
              onMouseEnter={() => handleMouseEnter('wrapper1')}
              onMouseLeave={() => handleMouseLeave('wrapper1')}
              style={{ scale: scrollYProgress, opacity: hoverStates['wrapper1'] || !Object.values(hoverStates).some(state => state) ? 1 : 0.35   }}

            >
              <motion.figure>
                <motion.img src={yeezyBoots[0].imgSrc} className={"img " + yeezyBoots[0].imgClass} />
              </motion.figure>
              <motion.div className="title_container"
              variants={collectionTitleVariant}
              style={{ opacity: hoverStates['wrapper4'] ? 0 : 1, scale: hoverStates['wrapper4'] ? 0 : 1 }}
              initial={"initial"}
              animate={hoverStates['wrapper1'] ? "animate" : "initial"}
              
              >
                <h1 className="collection_title frnrs_title">YEEZY 350V2</h1>
              </motion.div>
              <motion.div className="desc_container"
              variants={collectionDescVariant}
              initial={"initial"}
              animate={hoverStates['wrapper1'] ? "animate" : "initial"}
              style={{ opacity: hoverStates['wrapper1'] || !Object.values(hoverStates).some(state => state) ? 1 : 0 }}
              >
                <h4 className="collection_desc">Yeezy 350v2 is the most recognizable shoe in the World. Designed by Kanye West, Created by Adidas</h4>
              </motion.div>
            </motion.div>

            <motion.div className="collection-wrapper"
              onMouseEnter={() => handleMouseEnter('wrapper2')}
              onMouseLeave={() => handleMouseLeave('wrapper2')}
              style={{ scale: scrollYProgress, opacity: hoverStates['wrapper2'] || !Object.values(hoverStates).some(state => state) ? 1 : 0.35   }}

            >
              <motion.figure>
                <motion.img src={yeezyBoots[1].imgSrc} className={"img " + yeezyBoots[1].imgClass} />
              </motion.figure>
              <motion.div className="title_container"
              variants={collectionTitleVariant}
              style={{ opacity: hoverStates['wrapper5'] ? 0 : 1, scale: hoverStates['wrapper5'] ? 0 : 1 }}

              initial={"initial"}
              animate={hoverStates['wrapper2'] ? "animate" : "initial"}
              >
                <h1 className="collection_title frnrs_title">YZY FOAMRNRS</h1>
              </motion.div>
              <motion.div className="desc_container"
              variants={collectionDescVariant}
              initial={"initial"}
              animate={hoverStates['wrapper2'] ? "animate" : "initial"}
              >
                <h4 className="collection_desc">Futuristic, lightweight shoes designed by Kanye West, made from EVA foam with unique breathable cut-outs.</h4>
              </motion.div>
            </motion.div>

            <motion.div className="collection-wrapper"
              onMouseEnter={() => handleMouseEnter('wrapper3')}
              onMouseLeave={() => handleMouseLeave('wrapper3')}
              style={{ scale: scrollYProgress, opacity: hoverStates['wrapper3'] || !Object.values(hoverStates).some(state => state) ? 1 : 0.35   }}

            >
              <motion.figure>
                <motion.img src={yeezyBoots[2].imgSrc} className={"img " + yeezyBoots[2].imgClass} />
              </motion.figure>
              <motion.div className="title_container"
              variants={collectionTitleVariant}
              style={{ opacity: hoverStates['wrapper6'] ? 0 : 1, scale: hoverStates['wrapper6'] ? 0 : 1 }}

              initial={"initial"}
              animate={hoverStates['wrapper3'] ? "animate" : "initial"}
              >
                <h1 className="collection_title frnrs_title">YEEZY SLIDES</h1>
              </motion.div>
              <motion.div className="desc_container"
              variants={collectionDescVariant}
              initial={"initial"}
              animate={hoverStates['wrapper3'] ? "animate" : "initial"}
              >
                <h4 className="collection_desc">Futuristic, lightweight shoes designed by Kanye West, made from EVA foam with unique cut-outs.</h4>
              </motion.div>
            </motion.div>

            <motion.div className="collection-wrapper"
              onMouseEnter={() => handleMouseEnter('wrapper4')}
              onMouseLeave={() => handleMouseLeave('wrapper4')}
              style={{ scale: scrollYProgress, opacity: hoverStates['wrapper4'] || !Object.values(hoverStates).some(state => state) ? 1 : 0.35   }}

            >
              <motion.figure>
                <motion.img src={yeezyBoots[7].imgSrc} className={"img " + yeezyBoots[7].imgClass} />
              </motion.figure>
              <motion.div className="title_container title_4"
              variants={collectionTitleVariant}
              initial={"initial"}
              animate={hoverStates['wrapper4'] ? "initial" : "animate"}
              >
                <h1 className="collection_title collection_title_reversed yzy450_title">YEEZY 450V2</h1>
              </motion.div>
              <motion.div className="desc_container"
              variants={collectionDescVariantReversed}
              initial={"initial"}
              animate={hoverStates['wrapper4'] ? "animate" : "initial"}
              >
                <h4 className="collection_desc">Avant-garde shoes with a unique, web-like structure on the midsole, blending with a primeknit upper for comfort and style</h4>
              </motion.div>
            </motion.div>

            <motion.div className="collection-wrapper yzypods"
              onMouseEnter={() => handleMouseEnter('wrapper5')}
              onMouseLeave={() => handleMouseLeave('wrapper5')}
              style={{ scale: scrollYProgress, opacity: hoverStates['wrapper5'] || !Object.values(hoverStates).some(state => state) ? 1 : 0.35   }}

            >
              <motion.figure className="yzypod_figure">
                <motion.img src={yeezyBoots[12].imgSrc} className={"img " + yeezyBoots[12].imgClass} />
              </motion.figure>
              <motion.div className="title_container"
              variants={collectionTitleVariant}

              initial={"initial"}
              animate={hoverStates['wrapper5'] ? "initial" : "animate"}
              >
                <h1 className="collection_title collection_title_reversed yzypods_title">YZY PODS</h1>
              </motion.div>
              <motion.div className="desc_container"
              variants={collectionDescVariantReversed}
              initial={"initial"}
              animate={hoverStates['wrapper5'] ? "animate" : "initial"}
              >
                <h4 className="collection_desc">Controversial, Innovative Yeezy Pods. Ye is releasing them in 2024, with the release of Vultures, Ye's return.</h4>
              </motion.div>
            </motion.div>

            <motion.div className="collection-wrapper"
              onMouseEnter={() => handleMouseEnter('wrapper6')}
              onMouseLeave={() => handleMouseLeave('wrapper6')}
              style={{ scale: scrollYProgress, opacity: hoverStates['wrapper6'] || !Object.values(hoverStates).some(state => state) ? 1 : 0.35   }}

            >
              <motion.figure>
              <motion.img src={yeezyBoots[11].imgSrc} className={"img " + yeezyBoots[11].imgClass} />
              </motion.figure>
              <motion.div className="title_container collection_title_reversed title_4"
              variants={collectionTitleVariant}
              initial={"initial"}
              animate={hoverStates['wrapper6'] ? "initial"  : "animate"}
              >
                <h1 className="collection_title yzy500_title">YEEZY 500</h1>
              </motion.div>
              <motion.div className="desc_container"
              variants={collectionDescVariantReversed}
              initial={"initial"}
              animate={hoverStates['wrapper6'] ? "animate" : "initial"}
              >
                <h4 className="collection_desc yzy500_desc">Retro, chunky silhouette sneakers combining suede, leather, and mesh with adiPRENE+ cushioning for style and comfort.</h4>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Yeezy;

