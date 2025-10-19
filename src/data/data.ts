import { ApertureIcon, HandHeartIcon, FlameIcon, FilePdfIcon, ThumbsUpIcon, RocketLaunchIcon, InstagramLogoIcon, FacebookLogoIcon, XLogoIcon, UsersIcon, ScanIcon, BugIcon, ImageIcon, } from "@phosphor-icons/react"
import rocketImg from '../../public/assets/rocket.png'
import heartImg from '../../public/assets/heart.png'
import scannerImg from '../../public/assets/scanner.png'
import flameImg from '../../public/assets/flame.png'
import Hasslecard from "@/components/reusable/hasslecard"
import IntuitiveCard from "@/components/reusable/intuitivecard"
import PdfCard from "@/components/reusable/pdfcard"
import yoloLogo from "../../public/assets/yolologo.png"
import yoloColor from "../../public/assets/yolocolor.png"
import profilePic from "../../public/assets/profile.png"
import bacteriPic from "../../public/assets/bacteria.png"
import photoImg from "../../public/assets/photo.png"
import pdfImg from "../../public/assets/pdf.png"

export const navLinks = [
  {
    id: 0,
    nav: 'Home',
    link: '/'
  },
  {
    id: 1,
    nav: 'guides',
    link: '/guides'
  },
]

export const heroData = [
  {
    id: 0,
    name: 'Wam',
    status: 'received',
    desc: '1a...F6D9F',
    price: '%1.200',
  },
  {
    id: 1,
    name: 'Wam',
    status: 'received',
    desc: '1a...F6D9F',
    price: '%1.200',
  },
  {
    id: 2,
    name: 'Wam',
    status: 'received',
    desc: '1a...F6D9F',
    price: '%1.200',
  },
  {
    id: 3,
    name: 'Wam',
    status: 'received',
    desc: '1a...F6D9F',
    price: '%1.200',
  },
  {
    id: 4,
    name: 'Wam',
    status: 'received',
    desc: '1a...F6D9F',
    price: '%1.200',
  },
  {
    id: 5,
    name: 'Wam',
    status: 'received',
    desc: '1a...F6D9F',
    price: '%1.200',
  },
]

export const aboutData = [
  {
    id: 0,
    title: 'Experience Seamless Scanning Process',
    desc: 'Upload your bacteria image and let our smart detection system automatically analyze',
    icon: ApertureIcon,
    image: scannerImg,
    color: '#7cbee0',
  },
  {
    id: 1,
    title: 'Fast Response Time ',
    desc: 'Enjoy a quick scanning process — that are completed in an average of 7–10 seconds',
    icon: RocketLaunchIcon,
    image: rocketImg,
    color: '#f4c773',
  },
  {
    id: 2,
    title: 'Fasten Your Process With ABaCoCoBar',
    desc: 'Simplify and accelerate your workflow with ABaCoCoBar — smart tools for faster processing',
    icon: FlameIcon,
    image: flameImg,
    color: '#fed849',
  },
  {
    id: 3,
    title: 'Scan Anywhere and Anytime Effortlesly',
    desc: 'Free cost and easy flow, integrated with train model of YOLOv11',
    icon: HandHeartIcon,
    image: heartImg,
    color: '#f24f3f',
  },
]

export const aboutPlusData = [
  {
    id: 0,
    desc: 'Mint and Secure SRC - 20 Tokens',
    image: [
      {id: 0, url: ''},
      {id: 1, url: ''},
      {id: 2, url: ''},
    ]
  },
  {
    id: 1,
    desc: 'Trade Collect, and Inscribe Ordinals',
    image: [
      {id: 0, url: ''},
      {id: 1, url: ''},
    ]
  },
  {
    id: 2,
    desc: 'Purchase STX 12 Tokens to power L2 apps on Stacks',
    image: [
      {id: 0, url: ''},
      {id: 1, url: ''},
      {id: 2, url: ''},
    ]
  },
]

export const serviceData = [
  {
    id: 0,
    title: 'We Provides PDF',
    title2: ' Friendly Report',
    desc: 'After completing the analysis, you can easily download a detailed report in PDF format',
    icon: FilePdfIcon,
    components: PdfCard,
  },
  {
    id: 1,
    title: 'Intuitive Performance ',
    title2: '& Fast Process',
    desc: 'Experience seamless efficiency with powerful and intuitive performance',
    icon: RocketLaunchIcon,
    components: IntuitiveCard,
  },
  {
    id: 2,
    title: 'Hassle- Free Cap',
    title2: '& esy to integrate',
    desc: 'Experience a simple and effortless way to analyze and count bacterial colonies. Our automated system makes the process fast, accurate, and completely hassle-free',
    icon: ThumbsUpIcon,
    components: Hasslecard,
  },
]

export const guideData = [
  {
    id: 0,
    title: 'Get started by signing up for a new account',
    baseRotateZ: -18,
    icon: UsersIcon,
    image: profilePic,
    color: '#fdddc1',
  },
  {
    id: 1,
    title: 'Navigate to the scan page to start analyzing your bacterial sample',
    baseRotateZ: 8,
    icon: ScanIcon,
    image: scannerImg,
    color: '#7cbee0',
  },
  {
    id: 2,
    title: 'Prepare your bacterial sample & Make sure the image is clear',
    baseRotateZ: 15,
    icon: BugIcon,
    image: bacteriPic,
    color: '#79a942',
  },
  {
    id: 3,
    title: 'Upload & Use our built-in YOLOv11 scanner for your bacterial sample',
    baseRotateZ: -12,
    icon: ImageIcon,
    image: photoImg,
    color: '#ece5d7',
  },
  {
    id: 4,
    title: 'Let our YOLOv11 scanner analyze your image in seconds',
    baseRotateZ: 4,
    icon: yoloLogo,
    image: yoloColor,
    color: '#ffffff',
  },
  {
    id: 5,
    title: 'View, download & Instantly see precise analysis results',
    baseRotateZ: 12,
    icon: FilePdfIcon,
    image: pdfImg,
    color: '#f25246',
  },
]

export const socmedData = [
  {
    id: 0,
    icon: XLogoIcon,
    link: '',
  },
  {
    id: 1,
    icon: FacebookLogoIcon,
    link: '',
  },
  {
    id: 2,
    icon: InstagramLogoIcon,
    link: '',
  },
]