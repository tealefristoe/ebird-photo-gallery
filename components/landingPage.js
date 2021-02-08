import landingStyles from '../styles/landingPage.module.css'
import {spacer, halfSpacer} from '../lib/web'

export default function landingPage(props) {
  return (<div className={landingStyles.container}>
    <div className={landingStyles.header}>Welcome to eBird Photo Gallery!</div>
    {spacer()}
    <div className={landingStyles.subheader}>What is eBird Photo Gallery?</div>
    <div>eBird Photo Gallery is your personal illustrated life list.</div>
    <div>Using data you're already submitting to eBird, eBird Photo Gallery lists all of the species you've seen, complete with the top rated photo you've submitted of each species.</div>
    {spacer()}
    <div className={landingStyles.subheader}>How does it look?</div>
    <div>Here are a few examples:</div>
    <div><a href="https://ebird-photo-gallery.vercel.app/?user=Teale+Fristoe">Teale Fristoe's List</a></div>
    <div><a href="https://ebird-photo-gallery.vercel.app/?user=Teale+Fristoe+California+2019">Teale Fristoe's 2019 California List</a></div>
    <div><a href="https://ebird-photo-gallery.vercel.app/?user=Mark+Stephenson">Mark Stephenson's List</a></div>
    <div><a href="https://ebird-photo-gallery.vercel.app/?user=Aaron+Maizlish">Aaron Maizlish's List</a></div>
    <div><a href="https://ebird-photo-gallery.vercel.app/?user=Derek+Heins">Derek Heins' List</a></div>
    {spacer()}
    <div className={landingStyles.subheader}>Why would I try it?</div>
    <div>eBird Photo Gallery helps you:</div>
    <div>- Organize your photos</div>
    <div>- Decide which species to target on your next outing</div>
    <div>- Share your passion with friends and family</div>
    {spacer()}
    <div className={landingStyles.subheader}>Can I try it?</div>
    <div>Sure! eBird Photo Gallery is currently in alpha. If you'd like to give it a try, email Teale at <a href="mailto: fristoe@gmail.com">fristoe@gmail.com</a>. He'll help get you set up.</div>
    {spacer()}
    <div className={landingStyles.subheader}>What else can it do?</div>
    <div>- Filter your photos by rating to see which species are missing an <span style={{fontStyle: 'italic'}}>excellent</span> photo</div>
    <div>- Curate your list by overriding the top rated photo with any photo you'd like</div>
    <div>- Switch layouts to reveal or hide photo details</div>
    {spacer()}
    <div className={landingStyles.subheader}>What if I have a suggestion or found a problem?</div>
    <div>Please send any feedback you have, positive or negative, to Teale at <a href="mailto: fristoe@gmail.com">fristoe@gmail.com</a>.</div>
  </div>)
}
