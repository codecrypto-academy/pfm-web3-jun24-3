import { Link } from 'react-router-dom';
function Terms() {
	return (
		<div className='vh-100 overflow-auto'>
			<h1 className='text-center'>Terms and Conditions of Use</h1>
			<p>
				<strong>1. Acceptance of Terms</strong>
			</p>
			<p>
				By accessing and using this website, you agree to comply with and be
				subject to these terms and conditions of use. If you do not agree with
				any of these terms, please do not use this site.
			</p>
			<p>
				<strong>2. Site Usage</strong>
			</p>
			<p>
				You are authorized to use this site for personal and non-commercial
				purposes. You must not violate any applicable laws, rules, or
				regulations when accessing or using this site.
			</p>
			<p>
				<strong>3. Intellectual Property</strong>
			</p>
			<p>
				The content, design, and all intellectual property associated with this
				site are the exclusive property of
				"CodeCrypto-TFM W3ETH G3". You are authorized to view and
				download material only for personal and non-commercial use.
			</p>
			<p>
				<strong>4. Privacy</strong>
			</p>
			<p>
				The personal information you provide when using this site is subject to
				our privacy policy, which you can review at this link{' '}
				<Link to={'/privacy'}>here</Link>
			</p>
			<p>
				<strong>5. Third-Party Links</strong>
			</p>
			<p>
				This site may contain links to third-party websites. We are not
				responsible for the content or privacy practices of those sites.
			</p>
			<p>
				<strong>6. Modifications</strong>
			</p>
			<p>
				We reserve the right to modify these terms and conditions at any time.
				Modifications will be effective immediately after being published on the
				site.
			</p>
			<p>
				<strong>7. Limitation of Liability</strong>
			</p>
			<p>
				In no event shall we be liable for direct, indirect, incidental,
				special, or consequential damages resulting from the use or inability to
				use this site.
			</p>
			<p>
				<strong>8. Applicable Law</strong>
			</p>
			<p>
				These terms and conditions are governed by the laws applicable in the
				national and international territory, without regard to their conflicts
				of legal principles.
			</p>
			<p>
				<strong>9. Contact</strong>
			</p>
			<p>
				If you have any questions or concerns about these terms and conditions,
				please contact us <Link to={'/about'}>here</Link>.
			</p>
			<p className='mt-5 text-center'>
				By using this site, you agree to these terms and conditions of use.
			</p>
		</div>
	);
}

export default Terms;
