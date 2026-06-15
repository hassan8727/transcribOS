import React, { useState, useEffect, useRef, useMemo } from "react";
import mammoth from "mammoth";

/* ============================================================
   TranscribeOS — Dhivehi Audio Transcription Management
   Single-file React app. Roles: Admin / Transcriber / Reviewer
   ============================================================ */

const T = {
  en: {
    appName: "TranscribeOS",
    tagline: "Dhivehi audio transcription management",
    dashboard: "Dashboard",
    jobs: "Jobs",
    editor: "Editor",
    team: "Team",
    role: "Acting as",
    admin: "Admin",
    transcriber: "Transcriber",
    reviewer: "Reviewer",
    newJob: "New job",
    assign: "Assign",
    open: "Open",
    startTranscribing: "Start transcribing",
    submitForReview: "Submit for review",
    approve: "Approve",
    return: "Return with notes",
    deadline: "Deadline",
    duration: "Duration",
    assignedTo: "Assigned to",
    unassigned: "Unassigned",
    progress: "Progress",
    status: "Status",
    source: "Source",
    allJobs: "All jobs",
    myQueue: "My queue",
    reviewQueue: "Review queue",
    activeJobs: "Active jobs",
    awaitingReview: "Awaiting review",
    approvedThisWeek: "Approved this week",
    overdue: "Overdue",
    recentActivity: "Recent activity",
    segments: "Segments",
    speaker: "Speaker",
    play: "Play",
    pause: "Pause",
    addSegment: "Add segment",
    saveDraft: "Save draft",
    saved: "Saved",
    notes: "Reviewer notes",
    noJobs: "Nothing here yet. Jobs will appear when they are assigned to this role.",
    pickJob: "Select a job from the Jobs page to open it in the editor.",
    workload: "Current workload",
    adminTab: "Admin",
    uploadMedia: "Upload media",
    templatesTab: "Templates",
    staffTab: "Staff",
    mediaFile: "Audio / video file",
    title: "Title (English)",
    titleDvLabel: "Title (Dhivehi)",
    template: "Template",
    createJob: "Create job",
    assignNow: "Assign now (optional)",
    later: "Assign later",
    addTemplate: "Add template",
    templateName: "Template name",
    templateDesc: "Formatting rules / description",
    remove: "Remove",
    addStaffMember: "Add staff member",
    fullName: "Full name",
    hasActive: "Cannot remove — staff member has active jobs",
    jobCreated: "Job created",
    noFile: "Choose an audio or video file first",
    attachedFile: "File",
    attachDocx: "Attach Word template (.docx)",
    wordAttached: "Word template",
    replaceDocx: "Replace",
    downloadDocx: "Download",
    exportWord: "Export to Word",
    copyForWord: "Copy for Word",
    copied: "Copied — paste into Word (Ctrl+V)",
    placeholders: "Placeholder commands",
    placeholdersHint: "Type these commands anywhere in your Word template. When a transcript is exported, each command is replaced with the job's data. Click a command to copy it:",
    usesTemplate: "Export uses this Word template's layout",
    preview: "Preview",
    clone: "Duplicate",
    setDefault: "Set as default",
    defaultLabel: "Default",
    close: "Close",
    previewNote: "Preview with sample data",
    copiedCmd: "Command copied — paste it in your Word file",
    editTemplate: "Edit",
    templateBody: "Template layout",
    insertCmd: "Click a command to insert it at the cursor",
    livePreview: "Live preview (sample data)",
    save: "Save",
    cancel: "Cancel",
    templateSaved: "Template saved",
    caseDetails: "Case details",
    caseNoLabel: "Case number — ޤަޟިއްޔާ ނަންބަރު",
    plaintiffTitle: "Claimant — ދަޢުވާކުރާ ފަރާތް",
    defendantsTitle: "Defendants — ދަޢުވާލިބޭ ފަރާތް",
    fillBeforeStart: "Fill in every defendant's details before starting the transcript.",
    filledBySystem: "Filled when the job is created",
    addDefendant: "Add defendant",
    defendantLawyer: "Legal counsel — ޤާނޫނީ ވަކީލު",
    courtSection: "Court case details (for court jobs)",
    addWitness: "Add witness",
    signoffT: "Hearing & sign-off — ބަޔާން ޓައިޕްކުރީ / ޗެކްކުރީ",
    signIn: "Sign in",
    username: "Username",
    password: "Password",
    wrongCreds: "Incorrect username or password",
    logout: "Log out",
    demoAccounts: "Demo accounts",
    roleLabel: "Role",
    rolesLabel: "Roles",
    needOneRole: "Each user needs at least one role",
    email: "Email",
    phone: "Contact number",
    forgotPassword: "Forgot password?",
    resetTitle: "Reset your password",
    resetHint: "Enter your username and the email registered to your account.",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    resetMismatch: "Passwords don't match",
    resetNoMatch: "No account matches that username and email",
    resetDone: "Password updated — sign in with your new password",
    changePassword: "Change password",
    voiceTab: "VoiceOS",
    listen: "Listen",
    verify: "Mark verified",
    verifiedLabel: "Verified",
    autoChip: "AUTO",
    autoNote: "This draft was written automatically by the system. Listen to the audio, correct each segment, then mark it verified.",
    draftGenerated: "Draft transcript generated — staff must verify each segment",
    ttsText: "Text to speak",
    ttsVoice: "Voice",
    ttsRate: "Speed",
    ttsPitch: "Pitch",
    speakBtn: "Speak",
    stopBtn: "Stop",
    pauseBtn: "Pause",
    resumeBtn: "Resume",
    ttsNoVoices: "No voices available — the browser is still loading them or speech isn't supported here.",
    ttsDvWarn: "Browsers don't ship a Dhivehi voice — Thaana text won't sound correct. Production Dhivehi TTS needs a custom-trained voice.",
    sttSection: "Auto-transcription engine (STT)",
    sttDemo: "Built-in demo engine (sample draft)",
    sttWhisper: "Whisper server — production (not connected)",
    sttAzure: "Azure Speech — production (not connected)",
    sttNote: "When the file is uploaded, the system writes a draft transcript that staff verify and correct. The demo engine inserts sample text; real Dhivehi STT runs on a backend model (e.g. Whisper fine-tuned on your office's transcripts) and plugs in here.",
    sttUrl: "Whisper server URL",
    sttTranscribing: "Sending audio to the Whisper server…",
    sttFail: "Couldn't reach the Whisper server — demo draft used instead",
    sttOk: "Whisper transcription received — staff must verify each segment",
    mediaFail: "Couldn't play this file here — the format may be unsupported in this preview. The job and transcript still work.",
    searchPlaceholder: "Search — case number, job ID, title, source…",
    results: "Results",
    noResults: "No jobs match your search",
    profileTab: "Profile",
    myProfile: "My profile",
    signature: "Signature",
    uploadSignature: "Upload signature image",
    drawSignature: "Or draw your signature",
    clearSig: "Clear",
    saveSig: "Save signature",
    sigSaved: "Signature saved",
    noSig: "No signature on file yet",
    sigNeeded: "Your signature isn't set — add it in your Profile before approving.",
    paymentForm: "Payment form (Jadhuvalu 4)",
    generateForm: "Approve & generate payment form",
    formReady: "Approved — payment form generated with signatures",
    viewForm: "View payment form",
    verifyHash: "Verification hash",
    pagesTyped: "Pages typed",
    pagesPayable: "Pages payable",
    recDuration: "Recording length",
    assignedDate: "Assigned date",
    completedDate: "Completed date",
    startTime: "Start time",
    endTime: "End time",
    bankName: "Bank name",
    accountName: "Account name",
    accountNo: "Account number",
    bankDetails: "Bank account (for payment)",
    typedByLabel: "Work done by",
    checkedByLabel: "Checked & approved by",
    downloadForm: "Download form",
    signedBy: "Digitally signed",
    idNumber: "ID card number",
    presentAddress: "Present address",
    permanentAddress: "Permanent address",
    jobTitle: "Job title",
    jinNumber: "JIN number",
    employeeDetails: "Employee details",
    dictate: "Dictate",
    noMic: "Speech recognition isn't supported in this browser",
    listening: "Listening… speak now",
    fullscreen: "Fullscreen",
    pip: "Mini player",
    pipFail: "Mini player isn't supported in this browser",
    currentPassword: "Current password",
    wrongCurrent: "Current password is incorrect",
    backToSignIn: "Back to sign in",
    resetPassword: "Reset password",
    passwordSet: "Password updated",
    accountFields: "Login account",
    cantDemoteSelf: "You can't change your own admin role",
    mediaLink: "OneDrive link to the audio / video",
    mediaLinkHint: "In OneDrive: right-click the file → Share → Copy link (set to 'Anyone with the link' so staff can play it)",
    openMedia: "Open media in OneDrive",
    linkInvalid: "Paste a valid OneDrive link first",
    streamFailed: "Can't stream this link directly — use the OneDrive button to listen",
    statuses: {
      new: "New",
      assigned: "Assigned",
      transcribing: "Transcribing",
      review: "In review",
      returned: "Returned",
      approved: "Approved",
    },
  },
  dv: {
    appName: "ޓްރާންސްކްރައިބް އޯއެސް",
    tagline: "ދިވެހި އޯޑިއޯ ޓްރާންސްކްރިޕްޝަން ބެލެހެއްޓުން",
    dashboard: "ޑޭޝްބޯޑު",
    jobs: "މަސައްކަތްތައް",
    editor: "އެޑިޓަރު",
    team: "ޓީމް",
    role: "ރޯލް",
    admin: "އެޑްމިން",
    transcriber: "ޓްރާންސްކްރައިބަރ",
    reviewer: "ރިވިއުއަރ",
    newJob: "އައު މަސައްކަތެއް",
    assign: "ހަވާލުކުރޭ",
    open: "ހުޅުވާ",
    startTranscribing: "ޓްރާންސްކްރައިބް ފަށާ",
    submitForReview: "ރިވިއުއަށް ފޮނުވާ",
    approve: "ފާސްކުރޭ",
    return: "ނޯޓާއެކު އަނބުރާ ފޮނުވާ",
    deadline: "ސުންގަޑި",
    duration: "ދިގުމިން",
    assignedTo: "ހަވާލުކުރެވިފައި",
    unassigned: "ހަވާލުނުކުރެވޭ",
    progress: "ކުރިއެރުން",
    status: "ހާލަތު",
    source: "މަސްދަރު",
    allJobs: "ހުރިހާ މަސައްކަތެއް",
    myQueue: "އަހަރެންގެ ކިއު",
    reviewQueue: "ރިވިއު ކިއު",
    activeJobs: "ހިނގަމުންދާ މަސައްކަތް",
    awaitingReview: "ރިވިއުގައި",
    approvedThisWeek: "މި ހަފްތާގައި ފާސްވި",
    overdue: "ސުންގަޑި ފަހަނައަޅާފައި",
    recentActivity: "ފަހުގެ ހަރަކާތްތައް",
    segments: "ބައިތައް",
    speaker: "ވާހަކަދައްކާ ފަރާތް",
    play: "ޕްލޭ",
    pause: "ޕޯޒް",
    addSegment: "ބައެއް އިތުރުކުރޭ",
    saveDraft: "ޑްރާފްޓް ރައްކާކުރޭ",
    saved: "ރައްކާކުރެވިއްޖެ",
    notes: "ރިވިއުއަރގެ ނޯޓްތައް",
    noJobs: "އަދި އެއްވެސް މަސައްކަތެއް ނެތް.",
    pickJob: "އެޑިޓަރުގައި ހުޅުވުމަށް މަސައްކަތެއް އިޚްތިޔާރުކުރޭ.",
    workload: "މިހާރުގެ މަސައްކަތް",
    adminTab: "އެޑްމިން",
    uploadMedia: "އޯޑިއޯ/ވީޑިއޯ އަޕްލޯޑް",
    templatesTab: "ޓެމްޕްލޭޓްތައް",
    staffTab: "މުވައްޒަފުން",
    mediaFile: "އޯޑިއޯ / ވީޑިއޯ ފައިލް",
    title: "ސުރުޚީ (އިނގިރޭސި)",
    titleDvLabel: "ސުރުޚީ (ދިވެހި)",
    template: "ޓެމްޕްލޭޓް",
    createJob: "މަސައްކަތް އުފައްދާ",
    assignNow: "މިހާރު ހަވާލުކުރޭ",
    later: "ފަހުން ހަވާލުކުރޭ",
    addTemplate: "ޓެމްޕްލޭޓެއް އިތުރުކުރޭ",
    templateName: "ޓެމްޕްލޭޓްގެ ނަން",
    templateDesc: "ފޯމެޓްގެ ތަފްޞީލު",
    remove: "އުނިކުރޭ",
    addStaffMember: "މުވައްޒަފެއް އިތުރުކުރޭ",
    fullName: "ފުރިހަމަ ނަން",
    hasActive: "ހިނގަމުންދާ މަސައްކަތް ހުރުމުން އުނިނުކުރެވޭނެ",
    jobCreated: "މަސައްކަތް އުފެއްދިއްޖެ",
    noFile: "ފުރަތަމަ ފައިލެއް އިޚްތިޔާރުކުރޭ",
    attachedFile: "ފައިލް",
    attachDocx: "ވޯޑް ޓެމްޕްލޭޓް (.docx) އިތުރުކުރޭ",
    wordAttached: "ވޯޑް ޓެމްޕްލޭޓް",
    replaceDocx: "ބަދަލުކުރޭ",
    downloadDocx: "ޑައުންލޯޑް",
    exportWord: "ވޯޑަށް އެކްސްޕޯޓްކުރޭ",
    copyForWord: "ވޯޑަށް ކޮޕީކުރޭ",
    copied: "ކޮޕީވެއްޖެ — ވޯޑަށް ޕޭސްޓްކުރޭ",
    placeholders: "ޕްލޭސްހޯލްޑަރ ކޮމާންޑްތައް",
    placeholdersHint: "ވޯޑް ޓެމްޕްލޭޓްގައި މި ކޮމާންޑްތައް ލިޔޭ. ކޮޕީކުރުމަށް ކޮމާންޑަށް ފިތާ:",
    usesTemplate: "އެކްސްޕޯޓްގައި މި ވޯޑް ޓެމްޕްލޭޓް ބޭނުންކުރެވޭނެ",
    preview: "ޕްރިވިއު",
    clone: "ކޮޕީއެއް ހަދާ",
    setDefault: "ޑިފޯލްޓަށް ހަދާ",
    defaultLabel: "ޑިފޯލްޓް",
    close: "ބަންދުކުރޭ",
    previewNote: "ނަމޫނާ ޑޭޓާއާއެކު ޕްރިވިއު",
    copiedCmd: "ކޮމާންޑް ކޮޕީވެއްޖެ",
    editTemplate: "އެޑިޓްކުރޭ",
    templateBody: "ޓެމްޕްލޭޓްގެ ލޭއައުޓް",
    insertCmd: "ކޮމާންޑަކަށް ފިތުމުން ކާސަރ ހުރި ތަނަށް ވަންނާނެ",
    livePreview: "ލައިވް ޕްރިވިއު (ނަމޫނާ ޑޭޓާ)",
    save: "ރައްކާކުރޭ",
    cancel: "ކެންސަލް",
    templateSaved: "ޓެމްޕްލޭޓް ރައްކާވެއްޖެ",
    caseDetails: "ޤަޟިއްޔާގެ މަޢުލޫމާތު",
    caseNoLabel: "ޤަޟިއްޔާ ނަންބަރު",
    plaintiffTitle: "ދަޢުވާކުރާ ފަރާތް",
    defendantsTitle: "ދަޢުވާލިބޭ ފަރާތް",
    fillBeforeStart: "ޓްރާންސްކްރިޕްޓް ފެށުމުގެ ކުރިން ދަޢުވާލިބޭ ހުރިހާ ފަރާތެއްގެ މަޢުލޫމާތު ފުރިހަމަކުރޭ.",
    filledBySystem: "މަސައްކަތް އުފައްދާއިރު ފުރިހަމަކުރެވޭ",
    addDefendant: "ދަޢުވާލިބޭ ފަރާތެއް އިތުރުކުރޭ",
    defendantLawyer: "ޤާނޫނީ ވަކީލު",
    courtSection: "ޤަޟިއްޔާގެ މަޢުލޫމާތު (ކޯޓު މަސައްކަތްތަކަށް)",
    addWitness: "ހެކިއެއް އިތުރުކުރޭ",
    signoffT: "ބަޔާން ޓައިޕްކުރީ / ޗެކްކުރީ",
    signIn: "ވަންނަވާ",
    username: "ޔޫޒަރނޭމް",
    password: "ޕާސްވޯޑް",
    wrongCreds: "ޔޫޒަރނޭމް ނުވަތަ ޕާސްވޯޑް ރަނގަޅެއް ނޫން",
    logout: "ނުކުންނަވާ",
    demoAccounts: "ޑެމޯ އެކައުންޓްތައް",
    roleLabel: "ރޯލް",
    rolesLabel: "ރޯލްތައް",
    needOneRole: "ކޮންމެ ޔޫޒަރަކަށް މަދުވެގެން އެއް ރޯލް ބޭނުންވޭ",
    email: "އީމެއިލް",
    phone: "ފޯނު ނަންބަރު",
    forgotPassword: "ޕާސްވޯޑް ހަނދާން ނެތުނީތަ؟",
    resetTitle: "ޕާސްވޯޑް ބަދަލުކުރޭ",
    resetHint: "ޔޫޒަރނޭމާއި އެކައުންޓްގައި ރަޖިސްޓްރީކޮށްފައިވާ އީމެއިލް ލިޔުއްވާ.",
    newPassword: "އައު ޕާސްވޯޑް",
    confirmPassword: "އައު ޕާސްވޯޑް ޔަޤީންކުރޭ",
    resetMismatch: "ޕާސްވޯޑްތައް ދިމައެއް ނުވޭ",
    resetNoMatch: "އެ ޔޫޒަރނޭމާއި އީމެއިލާ ދިމާވާ އެކައުންޓެއް ނެތް",
    resetDone: "ޕާސްވޯޑް ބަދަލުވެއްޖެ — އައު ޕާސްވޯޑުން ވަންނަވާ",
    changePassword: "ޕާސްވޯޑް ބަދަލުކުރޭ",
    voiceTab: "ވޮއިސްއޯއެސް",
    listen: "އަޑުއަހާ",
    verify: "ޗެކްކޮށްފިން",
    verifiedLabel: "ޗެކްކުރެވިފައި",
    autoChip: "އޮޓޯ",
    autoNote: "މި ޑްރާފްޓް ލިޔުނީ ސިސްޓަމުން. އޯޑިއޯ އަޑުއަހާ، ކޮންމެ ބައެއް ރަނގަޅުކޮށް ޗެކްކުރޭ.",
    draftGenerated: "ޑްރާފްޓް ތައްޔާރުވެއްޖެ — ކޮންމެ ބައެއް ޗެކްކުރަންޖެހޭ",
    ttsText: "ކިޔާނެ ލިޔުން",
    ttsVoice: "އަޑު",
    ttsRate: "ސްޕީޑް",
    ttsPitch: "ޕިޗް",
    speakBtn: "ކިޔާ",
    stopBtn: "ހުއްޓާ",
    pauseBtn: "ޕޯޒް",
    resumeBtn: "ކުރިއަށް",
    ttsNoVoices: "އަޑެއް ނުފެނުނު",
    ttsDvWarn: "ބްރައުޒަރުގައި ދިވެހި އަޑެއް ނެތް — ތާނަ ލިޔުން ރަނގަޅަށް ނީވޭނެ.",
    sttSection: "އޮޓޯ ޓްރާންސްކްރިޕްޝަން އިންޖީން",
    sttDemo: "ޑެމޯ އިންޖީން (ނަމޫނާ ޑްރާފްޓް)",
    sttWhisper: "ވިސްޕަރ ސާވަރ — ޕްރޮޑަކްޝަން",
    sttAzure: "އެޒިއުރ ސްޕީޗް — ޕްރޮޑަކްޝަން",
    sttNote: "ފައިލް އަޕްލޯޑްކުރުމުން ސިސްޓަމުން ޑްރާފްޓެއް ލިޔެދޭނެ. މުވައްޒަފުން އެ ޗެކްކޮށް ރަނގަޅުކުރާނީ. އަސްލު ދިވެހި އެސްޓީޓީ ހިނގާނީ ބެކްއެންޑް މޮޑެލްއަކުން.",
    sttUrl: "ވިސްޕަރ ސާވަރގެ ޔޫއާރްއެލް",
    sttTranscribing: "ވިސްޕަރ ސާވަރަށް އޯޑިއޯ ފޮނުވަނީ…",
    sttFail: "ވިސްޕަރ ސާވަރާ ގުޅުމެއް ނުވި — ޑެމޯ ޑްރާފްޓް ބޭނުންކުރެވުނީ",
    sttOk: "ވިސްޕަރ ޓްރާންސްކްރިޕްޝަން ލިބިއްޖެ",
    mediaFail: "މި ފައިލް މިތާ ޕްލޭއެއް ނުކުރެވުނު — ފޯމެޓް ސަޕޯޓް ނުކުރަނީ ކަމަށް ވެދާނެ.",
    searchPlaceholder: "ހޯދާ — ޤަޟިއްޔާ ނަންބަރު، އައިޑީ، ސުރުޚީ…",
    results: "ނަތީޖާ",
    noResults: "ހޯދި އެއްޗަކާ ދިމާވާ މަސައްކަތެއް ނެތް",
    profileTab: "ޕްރޮފައިލް",
    myProfile: "އަހަރެންގެ ޕްރޮފައިލް",
    signature: "ސޮއި",
    uploadSignature: "ސޮއިގެ ފޮޓޯ އަޕްލޯޑްކުރޭ",
    drawSignature: "ނުވަތަ ސޮއި ކުރައްވާ",
    clearSig: "ފޮހެލާ",
    saveSig: "ސޮއި ރައްކާކުރޭ",
    sigSaved: "ސޮއި ރައްކާވެއްޖެ",
    noSig: "އަދި ސޮއެއް ނެތް",
    sigNeeded: "ތިޔަ ބޭފުޅާގެ ސޮއި ނެތް — ފާސްކުރުމުގެ ކުރިން ޕްރޮފައިލްގައި ސޮއި އިތުރުކުރައްވާ.",
    paymentForm: "ފައިސާ ފޯމު (ޖަދުވަލު 4)",
    generateForm: "ފާސްކޮށް ފައިސާ ފޯމު ތައްޔާރުކުރޭ",
    formReady: "ފާސްވެއްޖެ — ސޮއިއާއެކު ފައިސާ ފޯމު ތައްޔާރުވެއްޖެ",
    viewForm: "ފައިސާ ފޯމު ބަލާ",
    verifyHash: "ޔަޤީންކުރުމުގެ ހޭޝް",
    pagesTyped: "ޓައިޕްކުރި ޞަފުހާ",
    pagesPayable: "ފައިސާދޭ ޞަފުހާ",
    recDuration: "ރެކޯޑިންގގެ ދިގުމިން",
    assignedDate: "ހަވާލުކުރި ތާރީޚު",
    completedDate: "ނިންމި ތާރީޚު",
    startTime: "ފެށި ގަޑި",
    endTime: "ނިންމި ގަޑި",
    bankName: "ބޭންކްގެ ނަން",
    accountName: "އެކައުންޓުގެ ނަން",
    accountNo: "އެކައުންޓް ނަންބަރު",
    bankDetails: "ބޭންކް އެކައުންޓް (ފައިސާއަށް)",
    typedByLabel: "މަސައްކަތްކުރި ފަރާތް",
    checkedByLabel: "ޗެކްކޮށް ފާސްކުރި ފަރާތް",
    downloadForm: "ފޯމު ޑައުންލޯޑްކުރޭ",
    signedBy: "ޑިޖިޓަލްކޮށް ސޮއިކޮށްފައި",
    idNumber: "އައި.ޑީ ކާޑު ނަންބަރު",
    presentAddress: "މިހާރުގެ އެޑްރެސް",
    permanentAddress: "ދާއިމީ އެޑްރެސް",
    jobTitle: "މަޤާމު",
    jinNumber: "ޖިން ނަންބަރު",
    employeeDetails: "މުވައްޒަފުގެ މަޢުލޫމާތު",
    dictate: "ޑިކްޓޭޓް",
    noMic: "މި ބްރައުޒަރުގައި ސަޕޯޓެއް ނެތް",
    listening: "އަޑުއަހަނީ… ވާހަކަދައްކަވާ",
    fullscreen: "ފުލްސްކްރީން",
    pip: "ކުޑަ ޕްލޭޔަރ",
    pipFail: "މި ބްރައުޒަރުގައި ސަޕޯޓެއް ނެތް",
    currentPassword: "މިހާރުގެ ޕާސްވޯޑް",
    wrongCurrent: "މިހާރުގެ ޕާސްވޯޑް ރަނގަޅެއް ނޫން",
    backToSignIn: "އަނބުރާ ވަނުމަށް",
    resetPassword: "ޕާސްވޯޑް ބަދަލުކުރޭ",
    passwordSet: "ޕާސްވޯޑް ބަދަލުވެއްޖެ",
    accountFields: "ލޮގިން އެކައުންޓް",
    cantDemoteSelf: "އަމިއްލަ އެޑްމިން ރޯލް ބަދަލެއް ނުކުރެވޭނެ",
    mediaLink: "އޯޑިއޯ / ވީޑިއޯގެ ވަންޑްރައިވް ލިންކް",
    mediaLinkHint: "ވަންޑްރައިވްގައި: ފައިލް → Share → Copy link",
    openMedia: "ވަންޑްރައިވްގައި ހުޅުވާ",
    linkInvalid: "ފުރަތަމަ ރަނގަޅު ލިންކެއް ޕޭސްޓްކުރޭ",
    streamFailed: "މި ލިންކް ސީދާ ޕްލޭ ނުކުރެވޭ — ވަންޑްރައިވް ބަޓަން ބޭނުންކުރޭ",
    statuses: {
      new: "އައު",
      assigned: "ހަވާލުކުރެވިފައި",
      transcribing: "ޓްރާންސްކްރައިބް ކުރަނީ",
      review: "ރިވިއުގައި",
      returned: "އަނބުރާ ފޮނުވިފައި",
      approved: "ފާސްވެފައި",
    },
  },
};

const STATUS_META = {
  new: { color: "#64748B", bg: "#F1F5F9" },
  assigned: { color: "#0369A1", bg: "#E0F2FE" },
  transcribing: { color: "#0F766E", bg: "#CCFBF1" },
  review: { color: "#A16207", bg: "#FEF9C3" },
  returned: { color: "#C2410C", bg: "#FFEDD5" },
  approved: { color: "#15803D", bg: "#DCFCE7" },
};

const TEAM = [
  { id: "u0", name: "Hassan Ali", roles: ["admin"], initials: "HA", username: "admin", password: "admin123", email: "hassan@court.gov.mv", phone: "+960 7770001" },
  { id: "u1", name: "Aishath Reema", roles: ["transcriber"], initials: "AR", username: "aishath", password: "staff123", email: "aishath@court.gov.mv", phone: "+960 7770002", idNo: "A123456", jin: "JIN-0421", jobTitle: "އެޑްމިނިސްޓްރޭޓިވް އޮފިސަރ", presentAddress: "މާލެ / ތީމުގެ", permanentAddress: "ހދ. ކުޅުދުއްފުށި / އާފަރު", bankName: "Bank of Maldives", accountNo: "7730000380451", accountName: "AISHATH REEMA" },
  { id: "u2", name: "Mohamed Nashid", roles: ["transcriber"], initials: "MN", username: "nashid", password: "staff123", email: "nashid@court.gov.mv", phone: "+960 7770003" },
  { id: "u3", name: "Fathimath Zara", roles: ["transcriber"], initials: "FZ", username: "zara", password: "staff123", email: "zara@court.gov.mv", phone: "+960 7770004" },
  { id: "u4", name: "Ibrahim Waheed", roles: ["reviewer"], initials: "IW", username: "ibrahim", password: "staff123", email: "ibrahim@court.gov.mv", phone: "+960 7770005", signature: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNDYiPjx0ZXh0IHg9IjYiIHk9IjMyIiBmb250LWZhbWlseT0iY3Vyc2l2ZSIgZm9udC1zaXplPSIyNiIgZmlsbD0iIzEwMTgyOCI+SWJyYWhpbSBXLjwvdGV4dD48L3N2Zz4=" },
  { id: "u5", name: "Mariyam Shifa", roles: ["reviewer", "transcriber"], initials: "MS", username: "shifa", password: "staff123", email: "shifa@court.gov.mv", phone: "+960 7770006", signature: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNDYiPjx0ZXh0IHg9IjYiIHk9IjMyIiBmb250LWZhbWlseT0iY3Vyc2l2ZSIgZm9udC1zaXplPSIyNiIgZmlsbD0iIzEwMTgyOCI+TS4gU2hpZmE8L3RleHQ+PC9zdmc+" },
];

/* Default editable body for the Mahsaru Bayaan template. */
const MAHSARU_BODY = `{{COURT}}
މާލެ، ދިވެހިރާއްޖެ
މަޙްޟަރު ބަޔާން

ޤަޟިއްޔާ ނަންބަރު: {{CASE_NO}}

{{PROSECUTION}}

{{DEFENDANTS}}

{{STATE_WITNESSES}}

{{DEFENSE_WITNESSES}}

{{INTERPRETER}}

................................................................

{{TRANSCRIPT}}

{{CLOSING}}

ބަޔާން ޓައިޕްކުރީ: {{TYPED_BY_POSITION}} {{TYPED_BY_NAME}}
ބަޔާން ޗެކްކުރީ: {{CHECKED_BY_POSITION}} {{CHECKED_BY_NAME}}`;

const INITIAL_TEMPLATES = [
  {
    id: "tp1",
    name: "މަޙްޟަރު ބަޔާން — Mahsaru Bayaan (Jadhuvalu 1)",
    isDefault: true,
    body: MAHSARU_BODY,
    desc: "Official court session record format. Court header, ޤަޟިއްޔާ ނަންބަރު, claimant, numbered defendants with legal counsel, state & defense witnesses (ސ.ނ for police, secret witnesses supported), interpreter, verbatim speaker paragraphs, closing certification, and ބަޔާން ޓައިޕްކުރީ / ޗެކްކުރީ sign-off.",
  },
  {
    id: "tp2",
    name: "Majlis committee — edited verbatim",
    desc: "Member names as speaker labels. Remove false starts and fillers. Timestamps at least every 5 minutes.",
  },
  {
    id: "tp3",
    name: "Press briefing — summary",
    desc: "Key statements only, attributed by name and post. Q&A captured as question/answer pairs.",
  },
];

const SAMPLE_SEGMENTS = [
  { id: 1, start: 0, end: 14, speaker: "ރިޔާސަތު", text: "މިއަދުގެ ޖަލްސާ ފެށުނީ ހެނދުނު ނުވައެއް ޖެހިއިރު. ހުރިހާ މެންބަރުންނަށް މަރުޙަބާ." },
  { id: 2, start: 14, end: 31, speaker: "މެންބަރު ޢަލީ", text: "ޝުކުރިއްޔާ. އަޅުގަނޑު ފުރަތަމަ ފާހަގަކޮށްލަން ބޭނުންވަނީ މި މައްސަލައިގެ މުހިއްމުކަން." },
  { id: 3, start: 31, end: 52, speaker: "މެންބަރު ޙަސަން", text: "އާދެ، އަޅުގަނޑުވެސް އެ ވާހަކައަށް ތާއީދުކުރަން. މިކަމުގައި އަވަސް ފިޔަވަޅެއް އެޅުން މުހިއްމު." },
  { id: 4, start: 52, end: 70, speaker: "ރިޔާސަތު", text: "" },
];

const INITIAL_JOBS = [
  {
    id: "TR-2026-041",
    title: "Majlis Committee Hearing — Finance",
    titleDv: "މަޖިލިސް ކޮމިޓީ — މާލިއްޔަތު",
    source: "People's Majlis",
    duration: 4320,
    deadline: "2026-06-13",
    status: "transcribing",
    assignee: "u1",
    progress: 62,
    notes: "",
    segments: [
      { id: 1, start: 0, end: 15, speaker: "ރިޔާސަތު", text: "މިއަދުގެ ޖަލްސާ ފެށުނީ ހެނދުނު ނުވައެއް ޖެހިއިރު.", auto: true, verified: true, confidence: 0.91 },
      { id: 2, start: 15, end: 30, speaker: "މެންބަރު ޢަލީ", text: "ޝުކުރިއްޔާ. އަޅުގަނޑު ފުރަތަމަ ފާހަގަކޮށްލަން ބޭނުންވަނީ މި މައްސަލައިގެ މުހިއްމުކަން.", auto: true, verified: true, confidence: 0.84 },
      { id: 3, start: 30, end: 45, speaker: "", text: "ދައުލަތުގެ ފަރާތުން ހުށަހެޅި ދައުވާ އިއްވައިފިން", auto: true, verified: false, confidence: 0.71 },
      { id: 4, start: 45, end: 60, speaker: "", text: "ހެކިބަސް ނެގުމަށް މިއަދުގެ މަޖިލިސް ކުރިއަށް ގެންދަނީ", auto: true, verified: false, confidence: 0.66 },
      { id: 5, start: 60, end: 75, speaker: "", text: "ދެން އޮންނާނީ އަންނަ ހަފްތާގެ އަޑުއެހުމެއް", auto: true, verified: false, confidence: 0.62 },
    ],
  },
  {
    id: "TR-2026-042",
    title: "Criminal Court Session CR-118/2026",
    titleDv: "ކްރިމިނަލް ކޯޓު އަޑުއެހުން CR-118",
    source: "Criminal Court",
    duration: 2715,
    deadline: "2026-06-11",
    status: "review",
    assignee: "u2",
    progress: 100,
    notes: "",
    caseNo: "118/Cr-C/2026",
    courtDv: "ކްރިމިނަލް ކޯޓު",
    hearingDate: "8 ޖޫން 2026",
    plaintiff: { name: "ޕްރޮސިކިއުޓަރ ޖެނެރަލްގެ އޮފީސް", lawyer: "އަޙްމަދު އަޙްމަދު", position: "ޕަބްލިކް ޕްރޮސިކިއުޓަރ" },
    defendants: [
      { name: "އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", idNo: "A000000", lawyerName: "އަޙްމަދު އަޙްމަދު", lawyerAddress: "މާލެ / ތީމުގެ", lawyerId: "A000000" },
      { name: "އިސްމާޢީލް އަޙްމަދު", address: "މާލެ / ތީމުގެ", idNo: "A000000", lawyerName: "އަޙްމަދު އަޙްމަދު", lawyerAddress: "މާލެ / ތީމުގެ", lawyerId: "" },
    ],
    stateWitnesses: [
      { name: "ޕޮލިސް ކޯޕްރަލް އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", serviceNo: "1234", idNo: "A00000" },
      { name: "ކަސްޓަމްސް އޮފިސަރ އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", serviceNo: "1234", idNo: "A00000" },
      { name: "ދައުލަތުގެ ސިއްރު ހެކި 00", address: "-", serviceNo: "", idNo: "-" },
    ],
    defenseWitnesses: [
      { name: "އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", serviceNo: "", idNo: "A000000" },
      { name: "ދަޢުވާލިބޭ ފަރާތުގެ ސިއްރު ހެކި 00", address: "-", serviceNo: "", idNo: "-" },
    ],
    interpreter: { name: "އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", idNo: "A000000" },
    typedBy: { position: "އެޑްމިނިސްޓްރޭޓިވް އޮފިސަރ", name: "މުޙައްމަދު ނާޝިދު" },
    checkedBy: { position: "ލީގަލް އޮފިސަރ", name: "އަޙްމަދު އަޙްމަދު" },
    section: "ބ2-ީ ސެކްޝަން",
    recDuration: "00:38:21",
    assignedDate: "25.09.2025",
    completedDate: "29.09.2025",
    startTime: "16:00",
    endTime: "00:00",
    pagesTyped: 9,
    pagesPayable: 9,
    bankName: "Bank of Maldives",
    accountName: "MOHAMED NASHID",
    accountNo: "7730000380451",
    segments: SAMPLE_SEGMENTS,
  },
  {
    id: "TR-2026-043",
    title: "Cabinet Press Briefing — Health",
    titleDv: "ކެބިނެޓް ޕްރެސް ބްރީފިން — ޞިއްޙަތު",
    source: "President's Office",
    duration: 1980,
    deadline: "2026-06-15",
    status: "assigned",
    assignee: "u3",
    progress: 0,
    notes: "",
    segments: SAMPLE_SEGMENTS,
  },
  {
    id: "TR-2026-044",
    title: "Council Meeting — Kaafu Atoll",
    titleDv: "ކައުންސިލް ބައްދަލުވުން — ކ. އަތޮޅު",
    source: "LGA",
    duration: 5400,
    deadline: "2026-06-09",
    status: "returned",
    assignee: "u1",
    progress: 88,
    notes: "Segment timestamps drift after 40:00 — please re-align. Speaker labels missing in part 3.",
    segments: SAMPLE_SEGMENTS,
  },
  {
    id: "TR-2026-045",
    title: "Civil Court Hearing 1582/Cv-C/2026",
    titleDv: "ސިވިލް ކޯޓު އަޑުއެހުން 1582",
    source: "Civil Court",
    duration: 3300,
    deadline: "2026-06-18",
    status: "new",
    assignee: null,
    progress: 0,
    notes: "",
    segments: SAMPLE_SEGMENTS,
  },
  {
    id: "TR-2026-046",
    title: "Parliamentary Q&A — Minister of Education",
    titleDv: "މަޖިލިސް ސުވާލު — ތަޢުލީމީ ވަޒީރު",
    source: "People's Majlis",
    duration: 2400,
    deadline: "2026-06-08",
    status: "approved",
    assignee: "u2",
    progress: 100,
    notes: "",
    segments: SAMPLE_SEGMENTS,
  },
];

const fmtDur = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
const fmtTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};
const isOverdue = (job) =>
  job.status !== "approved" && new Date(job.deadline) < new Date("2026-06-10");

/* Build candidate direct-stream URLs from a OneDrive / SharePoint share link.
   The editor tries each in order until one plays:
   1. SharePoint links: append download=1 (works for "Anyone with the link" shares)
   2. onedrive.live.com links: rebuild as /download?resid=…&authkey=…
   3. Shares API: works for 1drv.ms short links and most public personal links
   4. The raw link itself (in case it's already a direct file URL)            */
const buildMediaCandidates = (link) => {
  if (!link) return [];
  const c = [];
  try {
    const u = new URL(link);
    if (u.hostname.endsWith("sharepoint.com")) {
      c.push(link + (link.includes("?") ? "&" : "?") + "download=1");
    }
    if (u.hostname.includes("onedrive.live.com")) {
      const resid = u.searchParams.get("resid");
      const authkey = u.searchParams.get("authkey");
      if (resid)
        c.push(
          `https://onedrive.live.com/download?resid=${encodeURIComponent(resid)}` +
            (authkey ? `&authkey=${encodeURIComponent(authkey)}` : "")
        );
    }
    const b64 = btoa(link).replace(/=+$/, "").replace(/\//g, "_").replace(/\+/g, "-");
    c.push(`https://api.onedrive.com/v1.0/shares/u!${b64}/root/content`);
    c.push(link);
  } catch {
    c.push(link);
  }
  return [...new Set(c)];
};

/* Placeholder commands the office can type inside a Word template.
   On export, each is replaced with the job's data.                   */
const PLACEHOLDERS = [
  ["{{ID}}", "Job number (e.g. TR-2026-047)"],
  ["{{CASE_NO}}", "ޤަޟިއްޔާ ނަންބަރު — case number"],
  ["{{COURT}}", "ކޯޓު — court name (Dhivehi)"],
  ["{{PROSECUTION}}", "ދަޢުވާކުރާ ފަރާތް — claimant details block"],
  ["{{DEFENDANTS}}", "ދަޢުވާލިބޭ ފަރާތް — numbered defendants block"],
  ["{{STATE_WITNESSES}}", "ދައުލަތުގެ ހެކިން — state witnesses block"],
  ["{{DEFENSE_WITNESSES}}", "ދަޢުވާލިބޭ ފަރާތުގެ ހެކިން — defense witnesses block"],
  ["{{INTERPRETER}}", "ތަރުޖަމާނު — interpreter block"],
  ["{{HEARING_DATE}}", "ޝަރީޢަތުގެ މަޖިލިސް ބޭއްވި ތާރީޚު"],
  ["{{CLOSING}}", "Closing certification paragraph"],
  ["{{TYPED_BY}}", "ބަޔާން ޓައިޕްކުރީ line"],
  ["{{CHECKED_BY}}", "ބަޔާން ޗެކްކުރީ line"],
  ["{{TITLE}}", "Title in English"],
  ["{{TITLE_DV}}", "Title in Dhivehi"],
  ["{{SOURCE}}", "Source office / court"],
  ["{{DATE}}", "Export date"],
  ["{{DEADLINE}}", "Deadline"],
  ["{{TRANSCRIBER}}", "Transcriber's name"],
  ["{{TRANSCRIPT}}", "Transcript (speaker paragraphs for court jobs, table otherwise)"],
];

/* Commands available in the in-app template editor, grouped. */
const PLACEHOLDER_GROUPS = [
  ["ޤަޟިއްޔާ — Case", [
    ["{{CASE_NO}}", "ޤަޟިއްޔާ ނަންބަރު"],
    ["{{COURT}}", "ކޯޓުގެ ނަން"],
    ["{{HEARING_DATE}}", "ޝަރީޢަތުގެ ތާރީޚު"],
  ]],
  ["ދަޢުވާކުރާ ފަރާތް — Claimant", [
    ["{{PROSECUTION}}", "Full claimant block"],
    ["{{PLAINTIFF_NAME}}", "ނަން"],
    ["{{PLAINTIFF_LAWYER}}", "ވަކީލުގެ ނަން"],
    ["{{PLAINTIFF_POSITION}}", "މަޤާމު"],
  ]],
  ["ފަރާތްތައް — Parties", [
    ["{{DEFENDANTS}}", "ދަޢުވާލިބޭ ފަރާތްތައް (block)"],
    ["{{STATE_WITNESSES}}", "ދައުލަތުގެ ހެކިން (block)"],
    ["{{DEFENSE_WITNESSES}}", "ދިފާޢީ ހެކިން (block)"],
    ["{{INTERPRETER}}", "ތަރުޖަމާނު (block)"],
  ]],
  ["ބަޔާން — Body", [
    ["{{TRANSCRIPT}}", "All transcript segments"],
    ["{{CLOSING}}", "Closing certification"],
  ]],
  ["ސޮއި — Sign-off", [
    ["{{TYPED_BY_NAME}}", "ޓައިޕްކުރި މީހާގެ ނަން"],
    ["{{TYPED_BY_POSITION}}", "ޓައިޕްކުރި މީހާގެ މަޤާމު"],
    ["{{CHECKED_BY_NAME}}", "ޗެކްކުރި މީހާގެ ނަން"],
    ["{{CHECKED_BY_POSITION}}", "ޗެކްކުރި މީހާގެ މަޤާމު"],
    ["{{TRANSCRIBER}}", "Assigned transcriber"],
  ]],
  ["އެހެނިހެން — Meta", [
    ["{{ID}}", "Job number"],
    ["{{TITLE}}", "Title (EN)"],
    ["{{TITLE_DV}}", "Title (DV)"],
    ["{{SOURCE}}", "Source"],
    ["{{DATE}}", "Export date"],
    ["{{DEADLINE}}", "Deadline"],
  ]],
];


const parseDocx = async (file) => {
  try {
    const buf = await file.arrayBuffer();
    const res = await mammoth.convertToHtml({ arrayBuffer: buf });
    return res.value || null;
  } catch {
    return null;
  }
};

/* Builds the final Word-export HTML for a job. If the template has a parsed
   Word file (docxHtml), its placeholder commands are filled; otherwise a
   clean default layout is used. Shared by the editor's export and the
   template gallery previews.                                              */
const buildExportHtml = (job, template, transcriberName, L) => {
  const esc = (x) =>
    String(x || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rows = job.segments
    .map(
      (s) => `<tr>
        <td style="width:80px;font-family:Consolas,monospace;font-size:9pt;color:#555;vertical-align:top;padding:6pt 8pt;">${fmtTime(s.start)}–${fmtTime(s.end)}</td>
        <td dir="rtl" style="width:120px;font-family:Faruma,'MV Faseyha','Noto Sans Thaana';font-weight:bold;font-size:12pt;vertical-align:top;padding:6pt 8pt;text-align:right;">${esc(s.speaker)}</td>
        <td dir="rtl" style="font-family:Faruma,'MV Faseyha','Noto Sans Thaana';font-size:13pt;line-height:1.9;vertical-align:top;padding:6pt 8pt;text-align:right;">${esc(s.text)}</td>
      </tr>`
    )
    .join("");
  const tableHtml = `<table style="border-collapse:collapse;width:100%;">${rows}</table>`;

  /* ----- court case header blocks (Thaana, RTL) ----- */
  const th = "font-family:Faruma,'MV Faseyha','Noto Sans Thaana';font-size:12pt;";
  const kvRow = (label, val) =>
    `<tr><td dir="rtl" style="${th}font-weight:bold;width:200px;vertical-align:top;padding:2pt 6pt;text-align:right;border:none;">${label}:</td>
     <td dir="rtl" style="${th}vertical-align:top;padding:2pt 6pt;text-align:right;border:none;">${esc(val)}</td></tr>`;

  const caseNoBlock = job.caseNo
    ? `<table dir="rtl" style="border-collapse:collapse;">${kvRow(CASE_LABELS.caseNo, job.caseNo)}</table>`
    : "";

  const prosecutionBlock = job.plaintiff
    ? `<p dir="rtl" style="${th}font-weight:bold;text-align:right;margin:10pt 0 4pt;text-decoration:underline;">${CASE_LABELS.plaintiffSection}:</p>
       <table dir="rtl" style="border-collapse:collapse;">
         ${kvRow(CASE_LABELS.name, job.plaintiff.name)}
         ${kvRow(CASE_LABELS.lawyerFullName, job.plaintiff.lawyer)}
         ${kvRow(CASE_LABELS.position, job.plaintiff.position)}
       </table>`
    : "";

  const defendantsBlock =
    job.defendants && job.defendants.length
      ? `<p dir="rtl" style="${th}font-weight:bold;text-align:right;margin:10pt 0 4pt;text-decoration:underline;">${CASE_LABELS.defendantSection}:</p>` +
        job.defendants
          .map(
            (d, i) => `<table dir="rtl" style="border-collapse:collapse;margin-bottom:8pt;">
              ${kvRow(`${i + 1}. ${CASE_LABELS.fullName}`, d.name)}
              ${kvRow(CASE_LABELS.permAddress, d.address)}
              ${kvRow(CASE_LABELS.idNo, d.idNo)}
              ${d.lawyerName ? kvRow(CASE_LABELS.legalCounsel, d.lawyerName) : ""}
              ${d.lawyerName && d.lawyerAddress ? kvRow(CASE_LABELS.permAddress, d.lawyerAddress) : ""}
              ${d.lawyerName && d.lawyerId ? kvRow(CASE_LABELS.idNo, d.lawyerId) : ""}
            </table>`
          )
          .join("")
      : "";

  /* ----- witnesses / interpreter / closing (Mahsaru Bayaan) ----- */
  const witnessBlock = (list, label) =>
    list && list.length
      ? `<p dir="rtl" style="${th}font-weight:bold;text-align:right;margin:10pt 0 4pt;text-decoration:underline;">${label}:</p>` +
        list
          .map(
            (w, i) => `<table dir="rtl" style="border-collapse:collapse;margin-bottom:8pt;">
              ${kvRow(`${i + 1}. ${CASE_LABELS.fullName}`, w.name)}
              ${kvRow(CASE_LABELS.permAddress, w.address || "-")}
              ${w.serviceNo ? kvRow(CASE_LABELS.serviceNo, w.serviceNo) : ""}
              ${kvRow(CASE_LABELS.idNo, w.idNo || "-")}
            </table>`
          )
          .join("")
      : "";
  const stateWitnessBlock = witnessBlock(job.stateWitnesses, CASE_LABELS.stateWitnessSection);
  const defenseWitnessBlock = witnessBlock(job.defenseWitnesses, CASE_LABELS.defenseWitnessSection);

  const interpreterBlock = job.interpreter?.name
    ? `<p dir="rtl" style="${th}font-weight:bold;text-align:right;margin:10pt 0 4pt;text-decoration:underline;">${CASE_LABELS.interpreterSection}:</p>
       <table dir="rtl" style="border-collapse:collapse;margin-bottom:8pt;">
         ${kvRow(CASE_LABELS.fullName, job.interpreter.name)}
         ${kvRow(CASE_LABELS.permAddress, job.interpreter.address || "-")}
         ${kvRow(CASE_LABELS.idNo, job.interpreter.idNo || "-")}
       </table>`
    : "";

  const courtDv = job.courtDv || "ކްރިމިނަލް ކޯޓު";
  const closingBlock =
    job.caseNo && job.hearingDate
      ? `<p dir="rtl" style="${th}line-height:1.9;text-align:right;margin:14pt 0 8pt;">${closingText(esc(courtDv), esc(job.caseNo), esc(job.hearingDate))}</p>`
      : "";
  const signoffBlock =
    (job.typedBy?.name
      ? `<p dir="rtl" style="${th}text-align:right;margin:4pt 0;">${CASE_LABELS.typedBy}: ${esc(job.typedBy.position || "")} ${esc(job.typedBy.name)}</p>`
      : "") +
    (job.checkedBy?.name
      ? `<p dir="rtl" style="${th}text-align:right;margin:4pt 0;">${CASE_LABELS.checkedBy}: ${esc(job.checkedBy.position || "")} ${esc(job.checkedBy.name)}</p>`
      : "");

  /* Court transcripts are written as bold-speaker paragraphs, per the
     Mahsaru Bayaan format; other jobs keep the timestamped table.      */
  const transcriptParas = job.segments
    .filter((s) => s.text.trim() || s.speaker.trim())
    .map(
      (s) =>
        `<p dir="rtl" style="${th}line-height:1.9;text-align:right;margin:6pt 0;"><b>${esc(s.speaker)}${s.speaker ? ":" : ""}</b> ${esc(s.text)}</p>`
    )
    .join("");
  const transcriptOut = job.caseNo ? transcriptParas : tableHtml;

  const wrap = (body) => `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="utf-8"><title>${esc(job.id)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>
  body { font-family: Calibri, sans-serif; margin: 2cm; background: #fff; }
  h1 { font-size: 14pt; color: #0E3B3A; margin: 0; }
  .meta { font-size: 10pt; color: #555; margin: 4pt 0 16pt; }
  table { border-collapse: collapse; width: 100%; }
  td { border-bottom: 0.5pt solid #ddd; }
</style></head>
<body>${body}</body></html>`;

  /* ----- field values for all placeholder commands ----- */
  const values = {
    ID: esc(job.id),
    CASE_NO: esc(job.caseNo || ""),
    COURT: esc(courtDv),
    PROSECUTION: prosecutionBlock,
    PLAINTIFF_NAME: esc(job.plaintiff?.name || ""),
    PLAINTIFF_LAWYER: esc(job.plaintiff?.lawyer || ""),
    PLAINTIFF_POSITION: esc(job.plaintiff?.position || ""),
    DEFENDANTS: defendantsBlock,
    STATE_WITNESSES: stateWitnessBlock,
    DEFENSE_WITNESSES: defenseWitnessBlock,
    INTERPRETER: interpreterBlock,
    HEARING_DATE: esc(job.hearingDate || ""),
    CLOSING: closingBlock,
    TYPED_BY: job.typedBy?.name ? `<span dir="rtl">${CASE_LABELS.typedBy}: ${esc((job.typedBy.position || "") + " " + job.typedBy.name)}</span>` : "",
    CHECKED_BY: job.checkedBy?.name ? `<span dir="rtl">${CASE_LABELS.checkedBy}: ${esc((job.checkedBy.position || "") + " " + job.checkedBy.name)}</span>` : "",
    TYPED_BY_NAME: esc(job.typedBy?.name || ""),
    TYPED_BY_POSITION: esc(job.typedBy?.position || ""),
    CHECKED_BY_NAME: esc(job.checkedBy?.name || ""),
    CHECKED_BY_POSITION: esc(job.checkedBy?.position || ""),
    TITLE: esc(job.title),
    TITLE_DV: `<span dir="rtl" style="font-family:Faruma,'MV Faseyha','Noto Sans Thaana';">${esc(job.titleDv)}</span>`,
    SOURCE: esc(job.source),
    DATE: esc(new Date().toISOString().slice(0, 10)),
    DEADLINE: esc(job.deadline),
    TRANSCRIBER: esc(transcriberName || "—"),
  };
  const applyValues = (html) => {
    let out = html;
    Object.entries(values).forEach(([key, val]) => {
      out = out.replace(new RegExp("\\{\\{\\s*" + key + "\\s*\\}\\}", "gi"), val);
    });
    const hasTrCmd = /\{\{\s*TRANSCRIPT\s*\}\}/i.test(out);
    return hasTrCmd ? out.replace(/\{\{\s*TRANSCRIPT\s*\}\}/gi, transcriptOut) : out + transcriptOut;
  };

  /* In-app editable template body (plain text with {{commands}}).
     Lines that are a single block command render unwrapped; everything
     else becomes a paragraph, RTL when it contains Thaana.            */
  if (template?.body) {
    const lineHtml = template.body
      .split("\n")
      .map((line) => {
        if (/^\s*\{\{\s*[A-Z_]+\s*\}\}\s*$/i.test(line)) return line.trim();
        if (!line.trim()) return '<p style="margin:6pt 0;">&nbsp;</p>';
        const rtl = /[\u0780-\u07BF]/.test(line);
        return `<p dir="${rtl ? "rtl" : "ltr"}" style="${rtl ? th + "text-align:right;" : ""}margin:4pt 0;line-height:1.8;">${esc(line)}</p>`;
      })
      .join("");
    return wrap(applyValues(lineHtml));
  }

  /* Uploaded Word file with placeholder commands */
  if (template?.docxHtml) {
    return wrap(applyValues(template.docxHtml));
  }

  /* ----- Mahsaru Bayaan layout for court jobs (matches the office's
         Jadhuvalu 1 template) ----- */
  if (job.caseNo) {
    return wrap(`
  <p dir="rtl" style="${th}font-weight:bold;font-size:14pt;text-align:center;margin:0;">${esc(courtDv)}</p>
  <p dir="rtl" style="${th}text-align:center;margin:2pt 0 12pt;">${CASE_LABELS.place}</p>
  <p dir="rtl" style="${th}font-weight:bold;font-size:13pt;text-align:center;text-decoration:underline;margin:0 0 14pt;">${CASE_LABELS.docTitle}</p>
  ${caseNoBlock}
  ${prosecutionBlock}
  ${defendantsBlock}
  ${stateWitnessBlock}
  ${defenseWitnessBlock}
  ${interpreterBlock}
  <p style="text-align:center;color:#555;letter-spacing:2px;margin:14pt 0;">................................................................................</p>
  ${transcriptParas}
  ${closingBlock}
  ${signoffBlock}`);
  }

  return wrap(`
  <h1>${esc(job.title)}</h1>
  <p dir="rtl" style="font-family:Faruma,'MV Faseyha','Noto Sans Thaana';font-size:14pt;margin:2pt 0;text-align:right;">${esc(job.titleDv)}</p>
  <p class="meta">
    ${esc(job.id)} &nbsp;|&nbsp; ${L.source}: ${esc(job.source)} &nbsp;|&nbsp; ${L.deadline}: ${esc(job.deadline)}
    ${template ? ` &nbsp;|&nbsp; ${L.template}: ${esc(template.name)}` : ""}
  </p>
  ${caseNoBlock}
  ${prosecutionBlock}
  ${defendantsBlock}
  ${tableHtml}`);
};

const SAMPLE_JOB = {
  id: "TR-2026-000",
  title: "Sample Hearing — Preview",
  titleDv: "ނަމޫނާ އަޑުއެހުން",
  source: "Preview Office",
  deadline: "2026-06-30",
  caseNo: "123/Cr-C/2026",
  courtDv: "ކްރިމިނަލް ކޯޓު",
  hearingDate: "30 އޮގަސްޓް 2026",
  plaintiff: { name: "ޕްރޮސިކިއުޓަރ ޖެނެރަލްގެ އޮފީސް", lawyer: "އަޙްމަދު އަޙްމަދު", position: "ޕަބްލިކް ޕްރޮސިކިއުޓަރ" },
  defendants: [
    { name: "އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", idNo: "A000000", lawyerName: "އަޙްމަދު އަޙްމަދު", lawyerAddress: "މާލެ / ތީމުގެ", lawyerId: "A000000" },
  ],
  stateWitnesses: [
    { name: "ޕޮލިސް ކޯޕްރަލް އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", serviceNo: "1234", idNo: "A00000" },
    { name: "ދައުލަތުގެ ސިއްރު ހެކި 01", address: "-", serviceNo: "", idNo: "-" },
  ],
  defenseWitnesses: [
    { name: "އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", serviceNo: "", idNo: "A000000" },
  ],
  interpreter: { name: "އަޙްމަދު އަޙްމަދު", address: "މާލެ / ތީމުގެ", idNo: "A000000" },
  typedBy: { position: "އެޑްމިނިސްޓްރޭޓިވް އޮފިސަރ", name: "އަޙްމަދު އަޙްމަދު" },
  checkedBy: { position: "ލީގަލް އޮފިސަރ", name: "އަޙްމަދު އަޙްމަދު" },
  segments: SAMPLE_SEGMENTS,
};

/* Dhivehi labels for the court case header — these match the office's
   document format, so they're always rendered in Thaana.               */
const CASE_LABELS = {
  caseNo: "ޤަޟިއްޔާ ނަންބަރު",
  plaintiffSection: "ދަޢުވާކުރާ ފަރާތުގެ މަޢުލޫމާތު",
  name: "ނަން",
  lawyerFullName: "ވަކީލުގެ ފުރިހަމަ ނަން",
  position: "މަޤާމު",
  defendantSection: "ދަޢުވާލިބޭ ފަރާތުގެ މަޢުލޫމާތު",
  fullName: "ފުރިހަމަ ނަން",
  permAddress: "ދާއިމީ އެޑްރެސް",
  idNo: "އައި.ޑީ ކާޑު ނަންބަރު",
  legalCounsel: "ޤާނޫނީ ވަކީލު",
  stateWitnessSection: "ދައުލަތުގެ ހެކިންގެ މަޢުލޫމާތު",
  defenseWitnessSection: "ދައުވާލިބޭފަރާތުގެ ހެކިންގެ މަޢުލޫމާތު",
  interpreterSection: "ތަރުޖަމާނުގެ މަޢުލޫމާތު",
  serviceNo: "ސ.ނ",
  typedBy: "ބަޔާން ޓައިޕްކުރީ",
  checkedBy: "ބަޔާން ޗެކްކުރީ",
  place: "މާލެ، ދިވެހިރާއްޖެ",
  docTitle: "މަޙްޟަރު ބަޔާން",
};

const emptyPlaintiff = () => ({
  name: "ޕްރޮސިކިއުޓަރ ޖެނެރަލްގެ އޮފީސް",
  lawyer: "",
  position: "ޕަބްލިކް ޕްރޮސިކިއުޓަރ",
});
const emptyDefendant = () => ({
  name: "", address: "", idNo: "", lawyerName: "", lawyerAddress: "", lawyerId: "",
});
const emptyWitness = () => ({ name: "", address: "", serviceNo: "", idNo: "" });

/* Simulated auto-transcription: in production this comes from a Dhivehi
   ASR model on the backend; here the system writes a draft the staff
   must listen to, correct, and verify segment by segment.            */
const DRAFT_POOL = [
  ["ރިޔާސަތު", "މިއަދުގެ ޖަލްސާ ފެށުނީ ހެނދުނު ނުވައެއް ޖެހި އިރު"],
  ["", "ދައުލަތުގެ ފަރާތުން ހުށަހެޅި ދައުވާ އިއްވައިފިން"],
  ["", "ދަޢުވާލިބޭ ފަރާތުން ދައުވާއަށް އިންކާރު ކުރޭ"],
  ["", "ހެކިބަސް ނެގުމަށް މިއަދުގެ މަޖިލިސް ކުރިއަށް ގެންދަނީ"],
  ["", "ދެން އޮންނާނީ އަންނަ ހަފްތާގެ އަޑުއެހުމެއް"],
  ["ރިޔާސަތު", "މަޖިލިސް ނިމުނީ މެންދުރު ބާރަ ޖެހިއިރު"],
];
const makeDraftSegments = () =>
  DRAFT_POOL.map(([speaker, text], i) => ({
    id: i + 1,
    start: i * 15,
    end: (i + 1) * 15,
    speaker,
    text,
    auto: true,
    verified: false,
    confidence: 0.62 + ((i * 7) % 30) / 100,
  }));

/* Search across job fields — case number first-class. */
const jobMatches = (j, q) => {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return [j.caseNo, j.id, j.title, j.titleDv, j.source, j.fileName, j.deadline]
    .some((v) => v && String(v).toLowerCase().includes(needle));
};

function SearchBar({ value, onChange, t }) {
  return (
    <div style={{ position: "relative", marginBottom: 14 }}>
      <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: 15, pointerEvents: "none" }}>
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.searchPlaceholder}
        style={{
          width: "100%", boxSizing: "border-box", border: "1px solid #CBD5D1",
          borderRadius: 11, padding: "11px 14px", paddingInlineStart: 40,
          fontSize: 14, background: "#fff",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="clear"
          style={{ position: "absolute", insetInlineEnd: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 14, padding: 4 }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

const speakAloud = (text) => {
  if (!("speechSynthesis" in window) || !text?.trim()) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
};

/* SHA-256 over the canonical form payload + both signatures, so the
   printed form carries a tamper-evident verification code. */
async function sha256Hex(str) {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    // fallback (non-crypto) if subtle is unavailable
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
    return "fallback-" + (h >>> 0).toString(16);
  }
}

/* Pull the payment-form fields out of a finished job. */
const buildPaymentData = (job, transcriber, supervisor) => {
  const pages = job.segments?.length ? Math.max(1, Math.ceil(job.segments.length / 1)) : 0;
  return {
    courtName: job.courtDv || "ކްރިމިނަލް ކޯޓު",
    section: job.section || "ބ2-ީ ސެކްޝަން",
    caseNo: job.caseNo || job.id,
    recDuration: job.recDuration || "00:38:21",
    assignedDate: job.assignedDate || "",
    completedDate: job.completedDate || new Date().toLocaleDateString("en-GB").replace(/\//g, "."),
    startTime: job.startTime || "16:00",
    endTime: job.endTime || "00:00",
    pagesTyped: job.pagesTyped || pages,
    pagesPayable: job.pagesPayable || pages,
    transcriberName: transcriber?.name || "—",
    transcriberSig: transcriber?.signature || null,
    supervisorName: supervisor?.name || "—",
    supervisorPosition: (supervisor?.roles?.includes("reviewer") ? "ލީގަލް އޮފިސަރ" : "ސުޕަވައިޒަރ"),
    supervisorSig: supervisor?.signature || null,
    bankName: job.bankName || transcriber?.bankName || "Bank of Maldives",
    accountName: job.accountName || transcriber?.accountName || (transcriber?.name || "").toUpperCase(),
    accountNo: job.accountNo || transcriber?.accountNo || "",
    approvedDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "."),
  };
};

/* Closing certification, per the court's Mahsaru Bayaan template */
const closingText = (courtDv, caseNo, hearingDate) =>
  `މިއީ، ${courtDv}ގެ ނަންބަރު ${caseNo} ޤަޟިއްޔާއާ ގުޅިގެން، ${hearingDate} ގައި ބޭއްވުނު ޝަރީޢަތުގެ މަޖިލީހުގައި ދެއްކި ވާހަކަތައް، ރެކޯޑިންގ އާ އެއްގޮތަށް އަކުރުންއަކުރަށް ލިޔެ މަޙްޟަރު ކުރެވިފައިވާ ބަޔާނެކެވެ.`;

/* ---------- tiny waveform (signature element) ---------- */
const BARS = Array.from({ length: 48 }, (_, i) =>
  0.25 + 0.7 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37))
);
function Waveform({ progress = 0, height = 36, playing = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height }}>
      {BARS.map((b, i) => {
        const active = i / BARS.length <= progress;
        return (
          <div
            key={i}
            style={{
              width: 3,
              borderRadius: 2,
              height: `${b * 100}%`,
              background: active ? "#0F766E" : "#CBD5D1",
              transition: "background 0.2s",
              animation:
                playing && active && i / BARS.length > progress - 0.04
                  ? "tos-pulse 0.8s infinite alternate"
                  : "none",
            }}
          />
        );
      })}
    </div>
  );
}

function StatusPill({ status, t }) {
  const m = STATUS_META[status];
  return (
    <span
      style={{
        background: m.bg,
        color: m.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.4,
        padding: "3px 10px",
        borderRadius: 999,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {t.statuses[status]}
    </span>
  );
}

function Avatar({ user, size = 26 }) {
  if (!user) return null;
  return (
    <span
      title={user.name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#0E3B3A",
        color: "#9FE3DC",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {user.initials}
    </span>
  );
}

/* ============================ APP ============================ */
export default function TranscribeOS() {
  const [lang, setLang] = useState("en");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeRole, setActiveRole] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [team, setTeam] = useState(TEAM);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [openJobId, setOpenJobId] = useState(null);
  const [toast, setToast] = useState(null);
  const t = T[lang];
  const dv = lang === "dv";
  const currentUser = team.find((u) => u.id === currentUserId) || null;
  const role = activeRole || currentUser?.roles?.[0] || "admin";

  // If the active role is revoked while signed in, fall back to a held role.
  useEffect(() => {
    if (currentUser && activeRole && !currentUser.roles.includes(activeRole)) {
      setActiveRole(currentUser.roles[0]);
    }
  }, [currentUser, activeRole]);

  useEffect(() => {
    if (role !== "admin" && page === "admin") setPage("dashboard");
  }, [role, page]);

  const addJob = (job) => {
    const nextNum = 41 + jobs.length;
    const full = {
      id: `TR-2026-${String(nextNum).padStart(3, "0")}`,
      progress: 0,
      notes: "",
      segments: [{ id: 1, start: 0, end: 30, speaker: "", text: "" }],
      ...job,
    };
    setJobs((js) => [full, ...js]);
    return full.id;
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const updateJob = (id, patch) =>
    setJobs((js) => js.map((j) => (j.id === id ? { ...j, ...patch } : j)));

  const visibleJobs = useMemo(() => {
    if (role === "transcriber")
      return jobs.filter(
        (j) =>
          j.assignee === currentUser?.id &&
          ["assigned", "transcribing", "returned"].includes(j.status)
      );
    if (role === "reviewer") return jobs.filter((j) => j.status === "review");
    return jobs;
  }, [jobs, role, currentUser]);

  const openJob = jobs.find((j) => j.id === openJobId) || null;

  const stats = {
    active: jobs.filter((j) => ["assigned", "transcribing", "returned"].includes(j.status)).length,
    review: jobs.filter((j) => j.status === "review").length,
    approved: jobs.filter((j) => j.status === "approved").length,
    overdue: jobs.filter(isOverdue).length,
  };

  const navItems = [
    ["dashboard", t.dashboard],
    ["jobs", role === "transcriber" ? t.myQueue : role === "reviewer" ? t.reviewQueue : t.jobs],
    ["editor", t.editor],
    ["team", t.team],
    ["voice", t.voiceTab],
    ["profile", t.profileTab],
    ...(role === "admin" ? [["admin", t.adminTab]] : []),
  ];

  if (!currentUser) {
    return (
      <LoginPage
        t={t} dv={dv} team={team}
        onToggleLang={() => setLang(dv ? "en" : "dv")}
        onResetPassword={(username, email, newPass) => {
          const user = team.find(
            (u) => u.username === username && (u.email || "").toLowerCase() === email
          );
          if (!user) return false;
          setTeam((tm) => tm.map((x) => (x.id === user.id ? { ...x, password: newPass } : x)));
          return true;
        }}
        onLogin={(user) => {
          setCurrentUserId(user.id);
          setActiveRole(user.roles[0]);
          setPage("dashboard");
        }}
      />
    );
  }

  return (
    <div
      dir={dv ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: "#F2F5F4",
        color: "#13272B",
        fontFamily: dv
          ? "'MV Faseyha', 'Faruma', 'Noto Sans Thaana', sans-serif"
          : "'Avenir Next', 'Segoe UI', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes tos-pulse { from { opacity: 0.55; } to { opacity: 1; } }
        .tos-thaana { font-family: 'MV Faseyha','Faruma','Noto Sans Thaana',sans-serif; direction: rtl; }
        .tos-card { background:#fff; border:1px solid #E2E8E6; border-radius:14px; }
        .tos-btn { border:none; cursor:pointer; border-radius:9px; font-weight:600; font-size:13px; padding:8px 14px; transition: filter .15s; }
        .tos-btn:hover { filter: brightness(0.96); }
        textarea:focus, input:focus, select:focus, button:focus-visible { outline: 2px solid #0F766E; outline-offset: 1px; }
        @media (max-width: 760px) { .tos-statgrid { grid-template-columns: 1fr 1fr !important; } .tos-jobrow { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ---------- Top bar ---------- */}
      <header
        style={{
          background: "#0E3B3A",
          color: "#EAF7F5",
          padding: "0 22px",
          height: 58,
          display: "flex",
          alignItems: "center",
          gap: 18,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.3 }}>
            Transcribe<span style={{ color: "#5EEAD4" }}>OS</span>
          </span>
          <span className="tos-thaana" style={{ fontSize: 13, color: "#9FE3DC" }}>
            ދިވެހި ޓްރާންސްކްރިޕްޝަން
          </span>
        </div>
        <nav style={{ display: "flex", gap: 4, marginInlineStart: 10, flex: 1 }}>
          {navItems.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className="tos-btn"
              style={{
                background: page === key ? "rgba(94,234,212,0.18)" : "transparent",
                color: page === key ? "#5EEAD4" : "#BFD9D6",
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar user={currentUser} size={28} />
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{currentUser.name}</div>
            {currentUser.roles.length > 1 ? (
              <select
                aria-label={t.role}
                value={role}
                onChange={(e) => setActiveRole(e.target.value)}
                style={{
                  background: "#0B2E2D", color: "#9FE3DC", border: "1px solid #155E5B",
                  borderRadius: 6, fontSize: 11, padding: "1px 4px", marginTop: 1,
                }}
              >
                {currentUser.roles.map((r) => (
                  <option key={r} value={r}>{t[r]}</option>
                ))}
              </select>
            ) : (
              <div style={{ fontSize: 11, color: "#9FE3DC" }}>{t[currentUser.roles[0]]}</div>
            )}
          </div>
        </div>
        <button
          title={t.changePassword}
          aria-label={t.changePassword}
          onClick={() => {
            const cur = window.prompt(t.currentPassword);
            if (cur == null) return;
            if (cur !== currentUser.password) { showToast(t.wrongCurrent); return; }
            const np = window.prompt(t.newPassword);
            if (!np) return;
            setTeam((tm) => tm.map((x) => (x.id === currentUser.id ? { ...x, password: np } : x)));
            showToast(t.passwordSet);
          }}
          className="tos-btn"
          style={{ background: "transparent", color: "#BFD9D6", border: "1px solid #155E5B", padding: "8px 10px" }}
        >
          🔑
        </button>
        <button
          onClick={() => { setCurrentUserId(null); setActiveRole(null); }}
          className="tos-btn"
          style={{ background: "transparent", color: "#BFD9D6", border: "1px solid #155E5B" }}
        >
          {t.logout}
        </button>
        <button
          onClick={() => setLang(dv ? "en" : "dv")}
          className="tos-btn"
          style={{ background: "#155E5B", color: "#EAF7F5" }}
        >
          {dv ? "EN" : "ދިވެހި"}
        </button>
      </header>

      {/* ---------- Pages ---------- */}
      <main style={{ maxWidth: 1100, width: "100%", margin: "0 auto", padding: "26px 20px 60px", flex: 1 }}>
        {page === "dashboard" && (
          <Dashboard t={t} dv={dv} stats={stats} jobs={jobs} setPage={setPage} setOpenJobId={setOpenJobId} />
        )}
        {page === "jobs" && (
          <JobsList
            t={t} dv={dv} role={role} jobs={visibleJobs} team={team} templates={templates}
            updateJob={updateJob} showToast={showToast}
            onOpen={(id) => { setOpenJobId(id); setPage("editor"); }}
          />
        )}
        {page === "editor" &&
          (openJob ? (
            <Editor
              key={openJob.id} t={t} dv={dv} role={role} job={openJob} templates={templates} team={team}
              currentUser={currentUser} updateJob={updateJob} showToast={showToast}
            />
          ) : (
            <div className="tos-card" style={{ padding: 40, textAlign: "center", color: "#64748B" }}>
              {t.pickJob}
            </div>
          ))}
        {page === "team" && <Team t={t} jobs={jobs} team={team} />}
        {page === "voice" && <VoicePanel t={t} dv={dv} />}
        {page === "profile" && (
          <Profile t={t} dv={dv} currentUser={currentUser}
            onSaveSig={(sig) => setTeam((tm) => tm.map((u) => (u.id === currentUser.id ? { ...u, signature: sig } : u)))} />
        )}
        {page === "admin" && role === "admin" && (
          <AdminPanel
            t={t} dv={dv} team={team} setTeam={setTeam}
            templates={templates} setTemplates={setTemplates}
            jobs={jobs} addJob={addJob} showToast={showToast}
            onOpenJobs={() => setPage("jobs")} currentUser={currentUser}
          />
        )}
      </main>

      {toast && (
        <div
          style={{
            position: "fixed", bottom: 24, insetInlineStart: "50%", transform: "translateX(-50%)",
            background: "#0E3B3A", color: "#EAF7F5", padding: "10px 20px",
            borderRadius: 10, fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", zIndex: 50,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------- Login ---------- */
function LoginPage({ t, dv, team, onLogin, onResetPassword, onToggleLang }) {
  const [mode, setMode] = useState("login"); // login | reset
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(null);

  const fieldStyle = (bad) => ({
    width: "100%", boxSizing: "border-box",
    border: "1px solid " + (bad ? "#FCA5A5" : "#CBD5D1"),
    borderRadius: 9, padding: "10px 12px", fontSize: 14,
  });
  const label = (txt) => (
    <label style={{ fontSize: 12.5, fontWeight: 700, color: "#3E5255", display: "block", margin: "14px 0 5px" }}>
      {txt}
    </label>
  );

  const submitLogin = () => {
    const user = team.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (user) onLogin(user);
    else setErr(t.wrongCreds);
  };

  const submitReset = () => {
    if (!newPass || newPass !== confirmPass) { setErr(t.resetMismatch); return; }
    const done = onResetPassword(username.trim().toLowerCase(), email.trim().toLowerCase(), newPass);
    if (!done) { setErr(t.resetNoMatch); return; }
    setMode("login"); setPassword(""); setNewPass(""); setConfirmPass("");
    setErr(null); setOk(t.resetDone);
  };

  return (
    <div
      dir={dv ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh", background: "#0E3B3A", display: "flex",
        alignItems: "center", justifyContent: "center", padding: 20,
        fontFamily: dv
          ? "'MV Faseyha','Faruma','Noto Sans Thaana',sans-serif"
          : "'Avenir Next','Segoe UI',system-ui,sans-serif",
      }}
    >
      <div style={{ width: "min(400px, 94vw)" }}>
        <style>{`
          .tos-thaana { font-family: 'MV Faseyha','Faruma','Noto Sans Thaana',sans-serif; direction: rtl; }
          .tos-btn { border:none; cursor:pointer; border-radius:9px; font-weight:600; font-size:13px; padding:8px 14px; transition: filter .15s; }
          .tos-btn:hover { filter: brightness(0.96); }
          input:focus, button:focus-visible { outline: 2px solid #0F766E; outline-offset: 1px; }
        `}</style>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontWeight: 800, fontSize: 28, letterSpacing: -0.5, color: "#EAF7F5" }}>
            Transcribe<span style={{ color: "#5EEAD4" }}>OS</span>
          </div>
          <div className="tos-thaana" style={{ fontSize: 15, color: "#9FE3DC", marginTop: 4 }}>
            ދިވެހި ޓްރާންސްކްރިޕްޝަން
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 26, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
          {mode === "login" ? (
            <>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#0E3B3A" }}>{t.signIn}</div>
              {ok && <div style={{ color: "#15803D", fontSize: 12.5, marginTop: 8, fontWeight: 600 }}>✓ {ok}</div>}
              {label(t.username)}
              <input dir="ltr" value={username} autoCapitalize="none"
                onChange={(e) => { setUsername(e.target.value); setErr(null); }}
                onKeyDown={(e) => e.key === "Enter" && submitLogin()}
                style={fieldStyle(false)} />
              {label(t.password)}
              <input dir="ltr" type="password" value={password}
                onChange={(e) => { setPassword(e.target.value); setErr(null); }}
                onKeyDown={(e) => e.key === "Enter" && submitLogin()}
                style={fieldStyle(!!err)} />
              {err && <div style={{ color: "#C2410C", fontSize: 12.5, marginTop: 8, fontWeight: 600 }}>⚠ {err}</div>}
              <button onClick={submitLogin} className="tos-btn"
                style={{ background: "#0F766E", color: "#fff", width: "100%", padding: "12px", fontSize: 14.5, marginTop: 18 }}>
                {t.signIn}
              </button>
              <button onClick={() => { setMode("reset"); setErr(null); setOk(null); }}
                style={{ background: "none", border: "none", color: "#0F766E", fontWeight: 700, fontSize: 12.5, cursor: "pointer", marginTop: 12, padding: 0 }}>
                {t.forgotPassword}
              </button>

              <div style={{ marginTop: 16, borderTop: "1px dashed #E2E8E6", paddingTop: 12 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                  {t.demoAccounts}
                </div>
                <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.8, direction: "ltr", fontFamily: "Consolas, monospace" }}>
                  admin / admin123 · aishath / staff123 · shifa / staff123 (2 roles)
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#0E3B3A" }}>{t.resetTitle}</div>
              <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 6, lineHeight: 1.5 }}>{t.resetHint}</div>
              {label(t.username)}
              <input dir="ltr" value={username} autoCapitalize="none"
                onChange={(e) => { setUsername(e.target.value); setErr(null); }}
                style={fieldStyle(false)} />
              {label(t.email)}
              <input dir="ltr" type="email" value={email} autoCapitalize="none"
                onChange={(e) => { setEmail(e.target.value); setErr(null); }}
                style={fieldStyle(false)} placeholder="name@court.gov.mv" />
              {label(t.newPassword)}
              <input dir="ltr" type="password" value={newPass}
                onChange={(e) => { setNewPass(e.target.value); setErr(null); }}
                style={fieldStyle(false)} />
              {label(t.confirmPassword)}
              <input dir="ltr" type="password" value={confirmPass}
                onChange={(e) => { setConfirmPass(e.target.value); setErr(null); }}
                onKeyDown={(e) => e.key === "Enter" && submitReset()}
                style={fieldStyle(!!err)} />
              {err && <div style={{ color: "#C2410C", fontSize: 12.5, marginTop: 8, fontWeight: 600 }}>⚠ {err}</div>}
              <button onClick={submitReset} className="tos-btn"
                style={{ background: "#0F766E", color: "#fff", width: "100%", padding: "12px", fontSize: 14.5, marginTop: 18 }}>
                {t.resetTitle}
              </button>
              <button onClick={() => { setMode("login"); setErr(null); }}
                style={{ background: "none", border: "none", color: "#64748B", fontWeight: 700, fontSize: 12.5, cursor: "pointer", marginTop: 12, padding: 0 }}>
                ← {t.backToSignIn}
              </button>
            </>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button onClick={onToggleLang} className="tos-btn" style={{ background: "#155E5B", color: "#EAF7F5" }}>
            {dv ? "EN" : "ދިވެހި"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ t, dv, stats, jobs, setPage, setOpenJobId }) {
  const cards = [
    [t.activeJobs, stats.active, "#0F766E"],
    [t.awaitingReview, stats.review, "#A16207"],
    [t.approvedThisWeek, stats.approved, "#15803D"],
    [t.overdue, stats.overdue, "#C2410C"],
  ];
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;
  const recent = searching ? jobs.filter((j) => jobMatches(j, query)) : jobs.slice(0, 4);
  return (
    <div>
      <div
        className="tos-statgrid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}
      >
        {cards.map(([label, val, color]) => (
          <div key={label} className="tos-card" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color }}>{val}</div>
            <div style={{ fontSize: 13, color: "#5B6B6E", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
      <SearchBar value={query} onChange={setQuery} t={t} />
      <h2 style={{ fontSize: 16, margin: "0 0 10px", color: "#0E3B3A" }}>
        {searching ? `${t.results} (${recent.length})` : t.recentActivity}
      </h2>
      {searching && recent.length === 0 && (
        <div className="tos-card" style={{ padding: 32, textAlign: "center", color: "#64748B" }}>
          {t.noResults}
        </div>
      )}
      <div style={{ display: "grid", gap: 10 }}>
        {recent.map((j) => (
          <button
            key={j.id}
            onClick={() => { setOpenJobId(j.id); setPage("editor"); }}
            className="tos-card"
            style={{
              padding: "14px 18px", display: "flex", alignItems: "center", gap: 16,
              cursor: "pointer", textAlign: "start", width: "100%", font: "inherit",
            }}
          >
            <Waveform progress={j.progress / 100} height={28} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{dv ? j.titleDv : j.title}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
                {j.id}{j.caseNo ? ` · ⚖ ${j.caseNo}` : ""} · {fmtDur(j.duration)} · {j.source}
              </div>
            </div>
            <StatusPill status={j.status} t={t} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Jobs list ---------- */
function JobsList({ t, dv, role, jobs, team, templates, updateJob, showToast, onOpen }) {
  const transcribers = team.filter((u) => u.roles.includes("transcriber"));
  const [query, setQuery] = useState("");
  const shown = jobs.filter((j) => jobMatches(j, query));
  if (jobs.length === 0)
    return <div className="tos-card" style={{ padding: 40, textAlign: "center", color: "#64748B" }}>{t.noJobs}</div>;
  return (
    <div>
    <SearchBar value={query} onChange={setQuery} t={t} />
    {shown.length === 0 && (
      <div className="tos-card" style={{ padding: 32, textAlign: "center", color: "#64748B" }}>
        {t.noResults}
      </div>
    )}
    <div style={{ display: "grid", gap: 12 }}>
      {shown.map((j) => {
        const assignee = team.find((u) => u.id === j.assignee);
        const template = templates.find((tp) => tp.id === j.templateId);
        const overdue = isOverdue(j);
        return (
          <div key={j.id} className="tos-card" style={{ padding: "16px 20px" }}>
            <div className="tos-jobrow" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "center" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{dv ? j.titleDv : j.title}</span>
                  <StatusPill status={j.status} t={t} />
                  {overdue && (
                    <span style={{ color: "#C2410C", fontSize: 12, fontWeight: 700 }}>⚠ {t.overdue}</span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 5, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <span>{j.id}</span>
                  {j.caseNo && <span style={{ color: "#0F766E", fontWeight: 700 }} dir="ltr">⚖ {j.caseNo}</span>}
                  <span>{t.source}: {j.source}</span>
                  <span>{t.duration}: {fmtDur(j.duration)}</span>
                  <span style={{ color: overdue ? "#C2410C" : undefined }}>{t.deadline}: {j.deadline}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {t.assignedTo}: {assignee ? <><Avatar user={assignee} size={20} /> {assignee.name}</> : t.unassigned}
                  </span>
                  {template && <span style={{ color: "#0F766E", fontWeight: 700 }}>⎘ {template.name}</span>}
                  {j.fileName && <span>{j.mediaType === "video" ? "🎬" : "♪"} {j.fileName}</span>}
                </div>
                {j.status === "returned" && j.notes && (
                  <div style={{ marginTop: 8, fontSize: 13, background: "#FFF7ED", border: "1px solid #FED7AA", color: "#9A3412", borderRadius: 8, padding: "8px 12px" }}>
                    <b>{t.notes}:</b> {j.notes}
                  </div>
                )}
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                  <Waveform progress={j.progress / 100} height={22} />
                  <span style={{ fontSize: 12, color: "#0F766E", fontWeight: 700 }}>{j.progress}%</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", minWidth: 170 }}>
                {role === "admin" && j.status === "new" && (
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (!e.target.value) return;
                      updateJob(j.id, { assignee: e.target.value, status: "assigned" });
                      showToast(`${j.id} → ${team.find((u) => u.id === e.target.value).name}`);
                    }}
                    style={{ padding: "8px 10px", borderRadius: 9, border: "1px solid #CBD5D1", fontSize: 13 }}
                  >
                    <option value="" disabled>{t.assign}…</option>
                    {transcribers.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                )}
                {role === "transcriber" && ["assigned", "returned"].includes(j.status) && (
                  <button className="tos-btn" style={{ background: "#0F766E", color: "#fff" }}
                    onClick={() => { updateJob(j.id, { status: "transcribing" }); onOpen(j.id); }}>
                    {t.startTranscribing}
                  </button>
                )}
                {role === "reviewer" && j.status === "review" && (
                  <>
                    <button className="tos-btn" style={{ background: "#15803D", color: "#fff" }}
                      onClick={() => { updateJob(j.id, { status: "approved" }); showToast(`${j.id} ✓`); }}>
                      {t.approve}
                    </button>
                    <button className="tos-btn" style={{ background: "#FFF", color: "#C2410C", border: "1px solid #FDBA74" }}
                      onClick={() => {
                        const n = window.prompt(t.notes);
                        if (n != null) { updateJob(j.id, { status: "returned", notes: n }); showToast(`${j.id} ↩`); }
                      }}>
                      {t.return}
                    </button>
                  </>
                )}
                <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A" }} onClick={() => onOpen(j.id)}>
                  {t.open}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

/* ---------- Editor ---------- */
function Editor({ t, dv, role, job, templates, team, currentUser, updateJob, showToast }) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [mediaDur, setMediaDur] = useState(0);
  const [mediaErr, setMediaErr] = useState(false);
  const [srcIdx, setSrcIdx] = useState(0);
  const timerRef = useRef(null);
  const mediaRef = useRef(null);

  const [altSrc, setAltSrc] = useState(null);
  const triedAltRef = useRef(false);

  const candidates = useMemo(
    () =>
      job.mediaLink
        ? buildMediaCandidates(job.mediaLink)
        : [altSrc || job.mediaUrl].filter(Boolean),
    [job.mediaLink, job.mediaUrl, altSrc]
  );
  const mediaSrc = candidates[srcIdx];
  const hasMedia = !!mediaSrc && !mediaErr;

  const onMediaError = () => {
    setPlaying(false);
    if (srcIdx + 1 < candidates.length) {
      setSrcIdx((i) => i + 1); // try next URL format
      return;
    }
    // blob: URLs are refused by some sandboxed/mobile webviews —
    // fall back to an in-memory data URL if we still hold the File.
    if (!triedAltRef.current && job.fileObj) {
      triedAltRef.current = true;
      const r = new FileReader();
      r.onload = () => { setAltSrc(r.result); setSrcIdx(0); };
      r.onerror = () => setMediaErr(true);
      r.readAsDataURL(job.fileObj);
      return;
    }
    setMediaErr(true);
  };
  const template = templates ? templates.find((tp) => tp.id === job.templateId) : null;
  const total =
    hasMedia && mediaDur ? mediaDur : job.segments[job.segments.length - 1].end;

  useEffect(() => {
    if (!hasMedia && playing) {
      timerRef.current = setInterval(
        () => setTime((x) => (x + 0.25 >= total ? (setPlaying(false), 0) : x + 0.25)),
        250
      );
    }
    return () => clearInterval(timerRef.current);
  }, [playing, total, hasMedia]);

  const togglePlay = () => {
    if (hasMedia) {
      const m = mediaRef.current;
      if (!m) return;
      if (playing) m.pause();
      else m.play();
      setPlaying((p) => !p);
    } else setPlaying((p) => !p);
  };

  const seek = (sec) => {
    const s = Math.max(0, Math.min(total, sec));
    setTime(s);
    if (hasMedia && mediaRef.current) mediaRef.current.currentTime = s;
  };

  const buildWordHtml = () => {
    const transcriber = (team || []).find((u) => u.id === job.assignee);
    return buildExportHtml(job, template, transcriber?.name, {
      source: t.source,
      deadline: t.deadline,
      template: t.template,
    });
  };

  const exportWord = () => {
    const html = buildWordHtml();
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${job.id}-transcript.doc`;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  // Fallback for environments that block downloads: copy rich HTML so it can
  // be pasted directly into Word with formatting intact.
  const copyForWord = async () => {
    const html = buildWordHtml();
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob(
              [job.segments.map((s) => `[${fmtTime(s.start)}] ${s.speaker}: ${s.text}`).join("\n")],
              { type: "text/plain" }
            ),
          }),
        ]);
      } else {
        const ta = document.createElement("textarea");
        ta.value = job.segments.map((s) => `[${fmtTime(s.start)}] ${s.speaker}: ${s.text}`).join("\n");
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast(t.copied);
    } catch {
      showToast("✕");
    }
  };

  const activeSeg = job.segments.find((s) => time >= s.start && time < s.end);

  const setSegText = (id, text) =>
    updateJob(job.id, {
      segments: job.segments.map((s) => (s.id === id ? { ...s, text, verified: false } : s)),
    });
  const setSegSpeaker = (id, speaker) =>
    updateJob(job.id, { segments: job.segments.map((s) => (s.id === id ? { ...s, speaker } : s)) });
  const verifySeg = (id) =>
    updateJob(job.id, {
      segments: job.segments.map((s) => (s.id === id ? { ...s, verified: true } : s)),
    });

  /* Real STT: live dictation into a segment via the browser's speech
     recognition (microphone). No Dhivehi model exists in browsers, so
     this recognizes in the device language; the production engine for
     uploaded files runs server-side and replaces the demo draft.      */
  const [showForm, setShowForm] = useState(false);

  const approveWithForm = async () => {
    const transcriber = team.find((u) => u.id === job.assignee);
    const supervisor = currentUser;
    if (!supervisor?.signature) { showToast(t.sigNeeded); return; }
    const data = buildPaymentData(job, transcriber, supervisor);
    const payload = JSON.stringify({
      job: job.id, caseNo: data.caseNo, pages: data.pagesPayable,
      transcriber: data.transcriberName, supervisor: data.supervisorName,
      account: data.accountNo, date: data.approvedDate,
      tSig: data.transcriberSig ? data.transcriberSig.slice(0, 64) : "",
      sSig: data.supervisorSig ? data.supervisorSig.slice(0, 64) : "",
    });
    const hash = await sha256Hex(payload);
    updateJob(job.id, { status: "approved", paymentForm: { ...data, hash } });
    showToast(t.formReady);
    setShowForm(true);
  };

  const dictate = (id) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast(t.noMic); return; }
    try {
      const r = new SR();
      r.interimResults = false;
      r.maxAlternatives = 1;
      r.onresult = (e) => {
        const heard = e.results[0]?.[0]?.transcript || "";
        if (!heard) return;
        updateJob(job.id, {
          segments: job.segments.map((sg) =>
            sg.id === id
              ? { ...sg, text: (sg.text ? sg.text + " " : "") + heard, verified: false }
              : sg
          ),
        });
      };
      r.onerror = () => showToast(t.noMic);
      r.start();
      showToast("🎤 " + t.listening);
    } catch {
      showToast(t.noMic);
    }
  };

  const addSegment = () => {
    const last = job.segments[job.segments.length - 1];
    updateJob(job.id, {
      segments: [...job.segments, { id: last.id + 1, start: last.end, end: last.end + 15, speaker: "", text: "" }],
    });
  };

  const filled = job.segments.filter((s) => s.text.trim()).length;
  const pct = Math.round((filled / job.segments.length) * 100);
  const autoCount = job.segments.filter((s) => s.auto).length;
  const verifiedCount = job.segments.filter((s) => s.verified).length;
  const hasUnverified = job.segments.some((s) => s.auto && !s.verified);

  /* ----- case details (court jobs) ----- */
  const isCourtJob = !!(job.caseNo || job.plaintiff || (job.defendants && job.defendants.length));
  const [caseOpen, setCaseOpen] = useState(true);
  const plaintiff = job.plaintiff || emptyPlaintiff();
  const defendants = job.defendants || [];
  const setPlaintiffField = (k, v) => updateJob(job.id, { plaintiff: { ...plaintiff, [k]: v } });
  const setDefField = (i, k, v) => {
    const ds = defendants.map((d, idx) => (idx === i ? { ...d, [k]: v } : d));
    updateJob(job.id, { defendants: ds });
  };
  const addDefendant = () => updateJob(job.id, { defendants: [...defendants, emptyDefendant()] });
  const removeDefendant = (i) =>
    updateJob(job.id, { defendants: defendants.filter((_, idx) => idx !== i) });

  const stateW = job.stateWitnesses || [];
  const defW = job.defenseWitnesses || [];
  const interp = job.interpreter || { name: "", address: "", idNo: "" };
  const typedBy = job.typedBy || { position: "އެޑްމިނިސްޓްރޭޓިވް އޮފިސަރ", name: "" };
  const checkedBy = job.checkedBy || { position: "ލީގަލް އޮފިސަރ", name: "" };
  const setWitField = (key, i, k, v) =>
    updateJob(job.id, { [key]: (job[key] || []).map((w, idx) => (idx === i ? { ...w, [k]: v } : w)) });
  const addWit = (key) => updateJob(job.id, { [key]: [...(job[key] || []), emptyWitness()] });
  const rmWit = (key, i) =>
    updateJob(job.id, { [key]: (job[key] || []).filter((_, idx) => idx !== i) });
  const setInterp = (k, v) => updateJob(job.id, { interpreter: { ...interp, [k]: v } });
  const setTyped = (k, v) => updateJob(job.id, { typedBy: { ...typedBy, [k]: v } });
  const setChecked = (k, v) => updateJob(job.id, { checkedBy: { ...checkedBy, [k]: v } });

  const thInput = { ...{
    border: "1px solid #E2E8E6", borderRadius: 8, padding: "7px 10px",
    fontSize: 16, width: "100%", boxSizing: "border-box",
  } };
  const fieldRow = (label, value, onChange, ph = "", ltr = false) => (
    <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", gap: 10, alignItems: "center" }}>
      <span className="tos-thaana" style={{ fontSize: 14, fontWeight: 700, color: "#3E5255" }}>{label}:</span>
      <input className={ltr ? "" : "tos-thaana"} dir={ltr ? "ltr" : "rtl"} style={thInput}
        value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={ph} />
    </div>
  );

  return (
    <div>
      <div className="tos-card" style={{ padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{dv ? job.titleDv : job.title}</div>
            <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 3 }}>
              {job.id} · {job.source} · {t.deadline}: {job.deadline}
            </div>
          </div>
          <StatusPill status={job.status} t={t} />
        </div>

        {(template || job.fileName) && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
            {template && (
              <span title={template.desc} style={{ fontSize: 12, background: "#CCFBF1", color: "#0F766E", fontWeight: 700, padding: "4px 10px", borderRadius: 999 }}>
                ⎘ {template.name}
              </span>
            )}
            {job.fileName && (
              <span style={{ fontSize: 12, background: "#F1F5F9", color: "#475569", fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>
                {job.mediaType === "video" ? "🎬" : "♪"} {t.attachedFile}: {job.fileName}
              </span>
            )}
          </div>
        )}
        {template && (
          <div style={{ marginTop: 8, fontSize: 12.5, color: "#5B6B6E", background: "#F6FAF9", border: "1px dashed #CBD5D1", borderRadius: 8, padding: "8px 12px" }}>
            {template.desc}
          </div>
        )}

        {hasMedia && (
          <>
            <video
              key={mediaSrc}
              ref={mediaRef}
              src={mediaSrc}
              preload="metadata"
              controls={job.mediaType === "video"}
              onTimeUpdate={(e) => setTime(e.target.currentTime)}
              onLoadedMetadata={(e) => setMediaDur(e.target.duration || 0)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={onMediaError}
              playsInline
              style={
                job.mediaType === "video"
                  ? { width: "100%", maxHeight: 360, borderRadius: 10, marginTop: 14, background: "#000" }
                  : { display: "none" }
              }
            />
            {job.mediaType === "video" && (
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A", padding: "5px 12px", fontSize: 12 }}
                  onClick={() => mediaRef.current?.requestFullscreen?.().catch(() => {})}>
                  ⛶ {t.fullscreen}
                </button>
                <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A", padding: "5px 12px", fontSize: 12 }}
                  onClick={async () => {
                    try {
                      const m = mediaRef.current;
                      if (m && document.pictureInPictureEnabled) {
                        if (document.pictureInPictureElement) await document.exitPictureInPicture();
                        else await m.requestPictureInPicture();
                      } else showToast(t.pipFail);
                    } catch { showToast(t.pipFail); }
                  }}>
                  ⧉ {t.pip}
                </button>
              </div>
            )}
          </>
        )}

        {mediaErr && !job.mediaLink && (
          <div style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.6, color: "#9A3412", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 9, padding: "9px 12px" }}>
            ⚠ {t.mediaFail} {job.fileName ? `(${job.fileName})` : ""}
          </div>
        )}

        {job.mediaLink && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            <a href={job.mediaLink} target="_blank" rel="noopener noreferrer" className="tos-btn"
              style={{ background: "#1D4ED8", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              ☁ {t.openMedia}
            </a>
            {mediaErr && (
              <span style={{ fontSize: 12.5, color: "#9A3412" }}>⚠ {t.streamFailed}</span>
            )}
          </div>
        )}

        {/* player */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
          <button
            onClick={togglePlay}
            aria-label={playing ? t.pause : t.play}
            className="tos-btn"
            style={{
              width: 46, height: 46, borderRadius: "50%", background: "#0E3B3A",
              color: "#5EEAD4", fontSize: 17, padding: 0,
            }}
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <div style={{ flex: 1, cursor: "pointer" }}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const frac = dv ? 1 - (e.clientX - r.left) / r.width : (e.clientX - r.left) / r.width;
              seek(frac * total);
            }}>
            <Waveform progress={total ? time / total : 0} height={40} playing={playing} />
          </div>
          <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 13, color: "#0E3B3A", fontWeight: 700 }}>
            {fmtTime(time)} / {fmtTime(total)}
          </span>
        </div>

        {job.status === "returned" && job.notes && (
          <div style={{ marginTop: 12, fontSize: 13, background: "#FFF7ED", border: "1px solid #FED7AA", color: "#9A3412", borderRadius: 8, padding: "8px 12px" }}>
            <b>{t.notes}:</b> {job.notes}
          </div>
        )}
      </div>

      {/* case details */}
      {!isCourtJob && (
        <button className="tos-btn" onClick={() => updateJob(job.id, { plaintiff: emptyPlaintiff(), defendants: [emptyDefendant()] })}
          style={{ background: "#fff", color: "#0E3B3A", border: "1px dashed #CBD5D1", marginBottom: 14 }}>
          ⚖ + {t.caseDetails}
        </button>
      )}
      {isCourtJob && (
        <div className="tos-card" style={{ marginBottom: 14, overflow: "hidden" }}>
          <button onClick={() => setCaseOpen((o) => !o)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "13px 20px",
              background: "#F6FAF9", border: "none", cursor: "pointer", font: "inherit",
              fontWeight: 800, fontSize: 14, color: "#0E3B3A", textAlign: "start",
            }}>
            <span>⚖ {t.caseDetails}</span>
            {job.caseNo && (
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0F766E", background: "#CCFBF1", padding: "2px 10px", borderRadius: 999, direction: "ltr" }}>
                {job.caseNo}
              </span>
            )}
            <span style={{ marginInlineStart: "auto", color: "#64748B" }}>{caseOpen ? "▾" : "▸"}</span>
          </button>

          {caseOpen && (
            <div style={{ padding: "16px 20px", display: "grid", gap: 18 }}>
              {fieldRow(CASE_LABELS.caseNo, job.caseNo, (v) => updateJob(job.id, { caseNo: v }), "123/Cr-C/2026", true)}

              <div>
                <div className="tos-thaana" style={{ fontWeight: 800, fontSize: 14.5, color: "#0E3B3A", marginBottom: 4 }}>
                  {CASE_LABELS.plaintiffSection}:
                </div>
                <div style={{ fontSize: 11.5, color: "#64748B", marginBottom: 10 }}>{t.filledBySystem}</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {fieldRow(CASE_LABELS.name, plaintiff.name, (v) => setPlaintiffField("name", v))}
                  {fieldRow(CASE_LABELS.lawyerFullName, plaintiff.lawyer, (v) => setPlaintiffField("lawyer", v), "އަޙްމަދު އަޙްމަދު")}
                  {fieldRow(CASE_LABELS.position, plaintiff.position, (v) => setPlaintiffField("position", v))}
                </div>
              </div>

              <div>
                <div className="tos-thaana" style={{ fontWeight: 800, fontSize: 14.5, color: "#0E3B3A", marginBottom: 4 }}>
                  {CASE_LABELS.defendantSection}:
                </div>
                <div style={{ fontSize: 11.5, color: "#9A3412", marginBottom: 10 }}>✎ {t.fillBeforeStart}</div>
                <div style={{ display: "grid", gap: 12 }}>
                  {defendants.map((d, i) => (
                    <div key={i} style={{ border: "1px solid #E2E8E6", borderRadius: 10, padding: "12px 14px", background: "#FBFDFC" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontWeight: 800, fontSize: 13, color: "#0F766E" }}>#{i + 1}</span>
                        <button className="tos-btn" onClick={() => removeDefendant(i)}
                          style={{ background: "#fff", color: "#C2410C", border: "1px solid #FDBA74", padding: "3px 10px", fontSize: 11.5, marginInlineStart: "auto" }}>
                          ✕ {t.remove}
                        </button>
                      </div>
                      <div style={{ display: "grid", gap: 7 }}>
                        {fieldRow(CASE_LABELS.fullName, d.name, (v) => setDefField(i, "name", v), "އަޙްމަދު އަޙްމަދު")}
                        {fieldRow(CASE_LABELS.permAddress, d.address, (v) => setDefField(i, "address", v), "މާލެ / ތީމުގެ")}
                        {fieldRow(CASE_LABELS.idNo, d.idNo, (v) => setDefField(i, "idNo", v), "A000000", true)}
                        <div className="tos-thaana" style={{ fontSize: 12.5, fontWeight: 700, color: "#64748B", marginTop: 4 }}>
                          {t.defendantLawyer}:
                        </div>
                        {fieldRow(CASE_LABELS.fullName, d.lawyerName, (v) => setDefField(i, "lawyerName", v))}
                        {fieldRow(CASE_LABELS.permAddress, d.lawyerAddress, (v) => setDefField(i, "lawyerAddress", v))}
                        {fieldRow(CASE_LABELS.idNo, d.lawyerId, (v) => setDefField(i, "lawyerId", v), "", true)}
                      </div>
                    </div>
                  ))}
                  <button className="tos-btn" onClick={addDefendant}
                    style={{ background: "#EEF4F3", color: "#0E3B3A", justifySelf: "start" }}>
                    + {t.addDefendant}
                  </button>
                </div>
              </div>

              {[
                ["stateWitnesses", CASE_LABELS.stateWitnessSection, stateW],
                ["defenseWitnesses", CASE_LABELS.defenseWitnessSection, defW],
              ].map(([key, label, list]) => (
                <div key={key}>
                  <div className="tos-thaana" style={{ fontWeight: 800, fontSize: 14.5, color: "#0E3B3A", marginBottom: 8 }}>
                    {label}:
                  </div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {list.map((w, i) => (
                      <div key={i} style={{ border: "1px solid #E2E8E6", borderRadius: 10, padding: "12px 14px", background: "#FBFDFC" }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontWeight: 800, fontSize: 13, color: "#0F766E" }}>#{i + 1}</span>
                          <button className="tos-btn" onClick={() => rmWit(key, i)}
                            style={{ background: "#fff", color: "#C2410C", border: "1px solid #FDBA74", padding: "3px 10px", fontSize: 11.5, marginInlineStart: "auto" }}>
                            ✕ {t.remove}
                          </button>
                        </div>
                        <div style={{ display: "grid", gap: 7 }}>
                          {fieldRow(CASE_LABELS.fullName, w.name, (v) => setWitField(key, i, "name", v), "ޕޮލިސް ކޯޕްރަލް އަޙްމަދު އަޙްމަދު")}
                          {fieldRow(CASE_LABELS.permAddress, w.address, (v) => setWitField(key, i, "address", v), "މާލެ / ތީމުގެ")}
                          {fieldRow(CASE_LABELS.serviceNo, w.serviceNo, (v) => setWitField(key, i, "serviceNo", v), "1234", true)}
                          {fieldRow(CASE_LABELS.idNo, w.idNo, (v) => setWitField(key, i, "idNo", v), "A000000", true)}
                        </div>
                      </div>
                    ))}
                    <button className="tos-btn" onClick={() => addWit(key)}
                      style={{ background: "#EEF4F3", color: "#0E3B3A", justifySelf: "start" }}>
                      + {t.addWitness}
                    </button>
                  </div>
                </div>
              ))}

              <div>
                <div className="tos-thaana" style={{ fontWeight: 800, fontSize: 14.5, color: "#0E3B3A", marginBottom: 8 }}>
                  {CASE_LABELS.interpreterSection}:
                </div>
                <div style={{ display: "grid", gap: 7 }}>
                  {fieldRow(CASE_LABELS.fullName, interp.name, (v) => setInterp("name", v))}
                  {fieldRow(CASE_LABELS.permAddress, interp.address, (v) => setInterp("address", v))}
                  {fieldRow(CASE_LABELS.idNo, interp.idNo, (v) => setInterp("idNo", v), "", true)}
                </div>
              </div>

              <div>
                <div className="tos-thaana" style={{ fontWeight: 800, fontSize: 14.5, color: "#0E3B3A", marginBottom: 8 }}>
                  {t.signoffT}:
                </div>
                <div style={{ display: "grid", gap: 7 }}>
                  {fieldRow("ޝަރީޢަތުގެ މަޖިލިސް ބޭއްވި ތާރީޚު", job.hearingDate, (v) => updateJob(job.id, { hearingDate: v }), "30 އޮގަސްޓް 2026")}
                  {fieldRow("ކޯޓު", job.courtDv, (v) => updateJob(job.id, { courtDv: v }), "ކްރިމިނަލް ކޯޓު")}
                  {fieldRow(`${CASE_LABELS.typedBy} — ${CASE_LABELS.position}`, typedBy.position, (v) => setTyped("position", v))}
                  {fieldRow(`${CASE_LABELS.typedBy} — ${CASE_LABELS.fullName}`, typedBy.name, (v) => setTyped("name", v))}
                  {fieldRow(`${CASE_LABELS.checkedBy} — ${CASE_LABELS.position}`, checkedBy.position, (v) => setChecked("position", v))}
                  {fieldRow(`${CASE_LABELS.checkedBy} — ${CASE_LABELS.fullName}`, checkedBy.name, (v) => setChecked("name", v))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* segments */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 2px 8px" }}>
        <h3 style={{ fontSize: 15, color: "#0E3B3A", margin: 0 }}>
          {t.segments} — {filled}/{job.segments.length} · {pct}%
          {autoCount > 0 && (
            <span style={{ marginInlineStart: 10, fontSize: 12.5, fontWeight: 700, color: hasUnverified ? "#C2410C" : "#0F766E" }}>
              ✓ {verifiedCount}/{job.segments.length} {t.verifiedLabel}
            </span>
          )}
        </h3>
        <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A" }} onClick={addSegment}>
          + {t.addSegment}
        </button>
      </div>

      {hasUnverified && (
        <div style={{ marginBottom: 10, fontSize: 13, lineHeight: 1.6, background: "#FFF7ED", border: "1px solid #FED7AA", color: "#9A3412", borderRadius: 9, padding: "10px 14px" }}>
          ⚙ {t.autoNote}
        </div>
      )}

      <div style={{ display: "grid", gap: 10 }}>
        {job.segments.map((s) => {
          const active = activeSeg?.id === s.id;
          const needsCheck = s.auto && !s.verified;
          return (
            <div key={s.id} className="tos-card"
              style={{
                padding: "12px 16px",
                borderColor: active ? "#0F766E" : needsCheck ? "#FDBA74" : undefined,
                background: needsCheck ? "#FFFBF5" : undefined,
                boxShadow: active ? "0 0 0 2px rgba(15,118,110,0.18)" : undefined,
              }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <button onClick={() => seek(s.start)} className="tos-btn"
                  style={{ background: "#0E3B3A", color: "#5EEAD4", fontVariantNumeric: "tabular-nums", padding: "4px 10px", fontSize: 12 }}>
                  {fmtTime(s.start)}–{fmtTime(s.end)}
                </button>
                <input
                  value={s.speaker}
                  onChange={(e) => setSegSpeaker(s.id, e.target.value)}
                  placeholder={t.speaker}
                  className="tos-thaana"
                  style={{ border: "1px solid #E2E8E6", borderRadius: 8, padding: "5px 10px", fontSize: 14, width: 160 }}
                />
                {needsCheck && (
                  <span title={t.autoNote} style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5, background: "#FFEDD5", color: "#C2410C", padding: "3px 9px", borderRadius: 999 }}>
                    ⚙ {t.autoChip} {s.confidence ? Math.round(s.confidence * 100) + "%" : ""}
                  </span>
                )}
                {s.verified && (
                  <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5, background: "#CCFBF1", color: "#0F766E", padding: "3px 9px", borderRadius: 999 }}>
                    ✓ {t.verifiedLabel}
                  </span>
                )}
                <span style={{ marginInlineStart: "auto", display: "flex", gap: 6 }}>
                  <button onClick={() => speakAloud(s.text)} title={t.listen} className="tos-btn"
                    style={{ background: "#EEF4F3", color: "#0E3B3A", padding: "4px 10px", fontSize: 12 }}>
                    🔊
                  </button>
                  <button onClick={() => dictate(s.id)} title={t.dictate} className="tos-btn"
                    style={{ background: "#EEF4F3", color: "#0E3B3A", padding: "4px 10px", fontSize: 12 }}>
                    🎤
                  </button>
                  {!s.verified && (
                    <button onClick={() => verifySeg(s.id)} className="tos-btn"
                      style={{ background: "#0F766E", color: "#fff", padding: "4px 12px", fontSize: 12 }}>
                      ✓ {t.verify}
                    </button>
                  )}
                </span>
              </div>
              <textarea
                value={s.text}
                onChange={(e) => setSegText(s.id, e.target.value)}
                rows={2}
                className="tos-thaana"
                placeholder="ޓްރާންސްކްރިޕްޓް ލިޔުއްވާ…"
                style={{
                  width: "100%", boxSizing: "border-box", border: "1px solid #E2E8E6",
                  borderRadius: 9, padding: "10px 12px", fontSize: 17, lineHeight: 1.9,
                  resize: "vertical", background: s.text.trim() ? "#fff" : "#FBFDFC",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap", alignItems: "center" }}>
        <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A" }}
          onClick={() => showToast(t.saved)}>
          {t.saveDraft}
        </button>
        <button className="tos-btn" style={{ background: "#1D4ED8", color: "#fff" }} onClick={exportWord}>
          📄 {t.exportWord}
        </button>
        <button className="tos-btn" style={{ background: "#fff", color: "#1D4ED8", border: "1px solid #93C5FD" }} onClick={copyForWord}>
          ⧉ {t.copyForWord}
        </button>
        {template?.docxUrl && (
          <a href={template.docxUrl} download={template.docxName}
            style={{ fontSize: 13, color: "#1D4ED8", fontWeight: 700, textDecoration: "none" }}>
            ⬇ {t.wordAttached}: {template.docxName}
          </a>
        )}
        {role !== "reviewer" && ["transcribing", "returned", "assigned"].includes(job.status) && (
          <button className="tos-btn" style={{ background: "#0F766E", color: "#fff" }}
            onClick={() => { updateJob(job.id, { status: "review", progress: 100 }); showToast(`${job.id} → ${t.statuses.review}`); }}>
            {t.submitForReview}
          </button>
        )}
        {role === "reviewer" && job.status === "review" && (
          <>
            <button className="tos-btn" style={{ background: "#15803D", color: "#fff" }}
              onClick={approveWithForm}>
              ✓ {t.generateForm}
            </button>
            <button className="tos-btn" style={{ background: "#fff", color: "#C2410C", border: "1px solid #FDBA74" }}
              onClick={() => {
                const n = window.prompt(t.notes);
                if (n != null) { updateJob(job.id, { status: "returned", notes: n }); showToast(`${job.id} ↩`); }
              }}>
              {t.return}
            </button>
          </>
        )}
        {job.status === "approved" && job.paymentForm && (
          <button className="tos-btn" style={{ background: "#1D4ED8", color: "#fff" }}
            onClick={() => setShowForm(true)}>
            📄 {t.viewForm}
          </button>
        )}
      </div>

      {showForm && job.paymentForm && (
        <PaymentFormModal t={t} data={job.paymentForm} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

/* ---------- Team ---------- */
function Team({ t, jobs, team }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
      {team.map((u) => {
        const load = jobs.filter(
          (j) => j.assignee === u.id && !["approved"].includes(j.status)
        ).length;
        return (
          <div key={u.id} className="tos-card" style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar user={u} size={44} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14.5 }}>{u.name}</div>
              <div style={{ fontSize: 12.5, color: "#64748B" }}>{u.roles.map((r) => t[r]).join(" \u00b7 ")}</div>
              <div style={{ fontSize: 12.5, color: "#0F766E", fontWeight: 700, marginTop: 4 }}>
                {t.workload}: {load}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Admin panel ---------- */
const inputStyle = {
  border: "1px solid #CBD5D1",
  borderRadius: 9,
  padding: "9px 12px",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
  background: "#fff",
};
const labelStyle = { fontSize: 12.5, fontWeight: 700, color: "#3E5255", marginBottom: 5, display: "block" };

function AdminPanel({ t, dv, team, setTeam, templates, setTemplates, jobs, addJob, showToast, onOpenJobs, currentUser }) {
  const [tab, setTab] = useState("upload");

  /* ----- upload state ----- */
  const [file, setFile] = useState(null);
  const [sttEngine, setSttEngine] = useState("demo");
  const [sttUrl, setSttUrl] = useState("http://localhost:8000");
  const [sttBusy, setSttBusy] = useState(false);
  const [title, setTitle] = useState("");
  const [titleDv, setTitleDv] = useState("");
  const [source, setSource] = useState("");
  const [deadline, setDeadline] = useState("2026-06-20");
  const [templateId, setTemplateId] = useState(() => templates.find((tp) => tp.isDefault)?.id || "");
  const [assignee, setAssignee] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [pLawyer, setPLawyer] = useState("");
  const [pName, setPName] = useState("ޕްރޮސިކިއުޓަރ ޖެނެރަލްގެ އޮފީސް");
  const [pPosition, setPPosition] = useState("ޕަބްލިކް ޕްރޮސިކިއުޓަރ");

  // The Editor converts the share link into direct-stream URLs (see
  // buildMediaCandidates above), so we just store the raw link here.
  const createJob = async () => {
    if (!file) { showToast(t.noFile); return; }
    let segments = makeDraftSegments(); // fallback: demo draft

    if (sttEngine === "whisper" && sttUrl.trim()) {
      setSttBusy(true);
      showToast(t.sttTranscribing);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch(sttUrl.replace(/\/+$/, "") + "/transcribe", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        if (Array.isArray(data.segments) && data.segments.length) {
          segments = data.segments.map((sg, i) => ({
            id: i + 1,
            start: Math.round(sg.start || 0),
            end: Math.round(sg.end || (sg.start || 0) + 15),
            speaker: sg.speaker || "",
            text: sg.text || "",
            auto: true,
            verified: false,
            confidence: typeof sg.confidence === "number" ? sg.confidence : 0.8,
          }));
          showToast(t.sttOk);
        } else throw new Error("empty");
      } catch {
        showToast(t.sttFail);
      }
      setSttBusy(false);
    }

    addJob({
      title: title || file.name.replace(/\.[^.]+$/, ""),
      titleDv: titleDv || title || file.name,
      source: source || "—",
      duration: 0,
      deadline,
      status: assignee ? "assigned" : "new",
      assignee: assignee || null,
      templateId: templateId || null,
      mediaUrl: URL.createObjectURL(file),
      fileObj: file, // kept in memory so playback can fall back to a data URL
      mediaType:
        file.type.startsWith("video") || /\.(mp4|mov|mkv|avi|webm)$/i.test(file.name)
          ? "video"
          : "audio",
      fileName: file.name,
      segments,
      caseNo: caseNo.trim() || null,
      plaintiff: caseNo.trim() || pLawyer.trim()
        ? { name: pName.trim(), lawyer: pLawyer.trim(), position: pPosition.trim() }
        : null,
      defendants: [],
    });
    if (sttEngine !== "whisper") showToast(t.draftGenerated);
    setFile(null); setTitle(""); setTitleDv(""); setSource(""); setAssignee("");
    setCaseNo(""); setPLawyer("");
    setTemplateId(templates.find((tp) => tp.isDefault)?.id || "");
    onOpenJobs();
  };

  /* ----- template form ----- */
  const [tpName, setTpName] = useState("");
  const [tpDesc, setTpDesc] = useState("");
  const [tpFile, setTpFile] = useState(null);
  const [previewTp, setPreviewTp] = useState(null);
  const [editTp, setEditTp] = useState(null);

  const copyCmd = async (cmd) => {
    try {
      await navigator.clipboard.writeText(cmd);
      showToast(t.copiedCmd);
    } catch {
      showToast(cmd);
    }
  };

  const attachDocx = async (id, f) => {
    if (!f) return;
    const html = await parseDocx(f);
    setTemplates((ts) =>
      ts.map((x) =>
        x.id === id ? { ...x, docxName: f.name, docxUrl: URL.createObjectURL(f), docxHtml: html } : x
      )
    );
  };

  /* ----- staff form ----- */
  const [stName, setStName] = useState("");
  const [stRoles, setStRoles] = useState(["transcriber"]);
  const [stUsername, setStUsername] = useState("");
  const [stPassword, setStPassword] = useState("");
  const [stEmail, setStEmail] = useState("");
  const [stPhone, setStPhone] = useState("");
  const [stIdNo, setStIdNo] = useState("");
  const [stPresentAddr, setStPresentAddr] = useState("");
  const [stPermAddr, setStPermAddr] = useState("");
  const [stJobTitle, setStJobTitle] = useState("");
  const [stJin, setStJin] = useState("");
  const [stBank, setStBank] = useState("Bank of Maldives");
  const [stAccNo, setStAccNo] = useState("");
  const [stAccName, setStAccName] = useState("");

  const transcribers = team.filter((u) => u.roles.includes("transcriber"));

  const addTemplate = async () => {
    if (!tpName.trim()) return;
    const docxHtml = tpFile ? await parseDocx(tpFile) : null;
    setTemplates((ts) => [
      ...ts,
      {
        id: `tp${Date.now()}`,
        name: tpName.trim(),
        desc: tpDesc.trim(),
        body: tpFile ? undefined : MAHSARU_BODY,
        ...(tpFile
          ? { docxName: tpFile.name, docxUrl: URL.createObjectURL(tpFile), docxHtml }
          : {}),
      },
    ]);
    setTpName(""); setTpDesc(""); setTpFile(null);
  };

  const addStaff = () => {
    if (!stName.trim() || !stUsername.trim() || !stPassword || !stEmail.trim()) return;
    const uname = stUsername.trim().toLowerCase();
    if (team.some((u) => u.username === uname)) { showToast("@" + uname + " ✕"); return; }
    const initials = stName.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    setTeam((tm) => [
      ...tm,
      {
        id: `u${Date.now()}`, name: stName.trim(), roles: stRoles.length ? stRoles : ["transcriber"],
        initials, username: uname, password: stPassword,
        email: stEmail.trim().toLowerCase(), phone: stPhone.trim(),
        idNo: stIdNo.trim(), presentAddress: stPresentAddr.trim(),
        permanentAddress: stPermAddr.trim(), jobTitle: stJobTitle.trim(),
        jin: stJin.trim(), bankName: stBank.trim(),
        accountNo: stAccNo.trim(), accountName: stAccName.trim(),
      },
    ]);
    setStName(""); setStUsername(""); setStPassword(""); setStEmail(""); setStPhone("");
    setStIdNo(""); setStPresentAddr(""); setStPermAddr(""); setStJobTitle("");
    setStJin(""); setStAccNo(""); setStAccName("");
  };

  const removeStaff = (id) => {
    const active = jobs.some((j) => j.assignee === id && j.status !== "approved");
    if (active) { showToast(t.hasActive); return; }
    setTeam((tm) => tm.filter((u) => u.id !== id));
  };

  const toggleRole = (u, r) => {
    const isSelf = currentUser && u.id === currentUser.id;
    const has = u.roles.includes(r);
    if (isSelf && r === "admin" && has) { showToast(t.cantDemoteSelf); return; }
    if (has && u.roles.length === 1) { showToast(t.needOneRole); return; }
    setTeam((tm) =>
      tm.map((x) =>
        x.id === u.id
          ? { ...x, roles: has ? x.roles.filter((z) => z !== r) : [...x.roles, r] }
          : x
      )
    );
    showToast(`${u.name}: ${has ? "−" : "+"} ${t[r]}`);
  };

  const tabs = [
    ["upload", t.uploadMedia],
    ["templates", t.templatesTab],
    ["staff", t.staffTab],
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {tabs.map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className="tos-btn"
            style={{
              background: tab === key ? "#0E3B3A" : "#fff",
              color: tab === key ? "#5EEAD4" : "#0E3B3A",
              border: "1px solid " + (tab === key ? "#0E3B3A" : "#E2E8E6"),
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* ---------- UPLOAD ---------- */}
      {tab === "upload" && (
        <div className="tos-card" style={{ padding: 24, maxWidth: 640 }}>
          <label style={labelStyle}>{t.mediaFile}</label>
          <input
            id="tos-media-input"
            type="file"
            accept="audio/*,video/*,.mp3,.wav,.m4a,.aac,.ogg,.mp4,.mov,.mkv,.webm"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", clip: "rect(0 0 0 0)" }}
          />
          <label
            htmlFor="tos-media-input"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              border: "2px dashed " + (file ? "#0F766E" : "#CBD5D1"),
              borderRadius: 12, padding: "26px 16px", cursor: "pointer",
              background: file ? "#F0FDFA" : "#FBFDFC", marginBottom: 16,
              color: file ? "#0F766E" : "#64748B", fontSize: 14, fontWeight: 600,
            }}>
            {file ? `♪ ${file.name} (${(file.size / 1048576).toFixed(1)} MB)` : "⬆ MP3 · WAV · M4A · MP4 · MOV"}
          </label>

          <div style={{ border: "1px solid #E2E8E6", borderRadius: 12, padding: "14px 16px", marginBottom: 16, background: "#F6FAF9" }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#0E3B3A", marginBottom: 8 }}>
              🎙 {t.sttSection}
            </div>
            <select style={{ ...inputStyle, marginBottom: 8 }} value={sttEngine}
              onChange={(e) => setSttEngine(e.target.value)}>
              <option value="demo">{t.sttDemo}</option>
              <option value="whisper">Whisper server (custom Dhivehi model)</option>
              <option value="azure" disabled>{t.sttAzure}</option>
            </select>
            {sttEngine === "whisper" && (
              <input
                dir="ltr"
                style={{ ...inputStyle, marginBottom: 8, fontFamily: "Consolas, monospace", fontSize: 13 }}
                value={sttUrl}
                onChange={(e) => setSttUrl(e.target.value)}
                placeholder="http://192.168.1.50:8000"
                aria-label={t.sttUrl}
              />
            )}
            {sttBusy && (
              <div style={{ fontSize: 12.5, color: "#0F766E", fontWeight: 700, marginBottom: 8 }}>
                ⏳ {t.sttTranscribing}
              </div>
            )}
            <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>{t.sttNote}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={labelStyle}>{t.title}</label>
              <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Committee Hearing — Budget" />
            </div>
            <div>
              <label style={labelStyle}>{t.titleDvLabel}</label>
              <input style={{ ...inputStyle, fontSize: 16 }} className="tos-thaana" value={titleDv} onChange={(e) => setTitleDv(e.target.value)} placeholder="ކޮމިޓީ ބައްދަލުވުން" />
            </div>
            <div>
              <label style={labelStyle}>{t.source}</label>
              <input style={inputStyle} value={source} onChange={(e) => setSource(e.target.value)} placeholder="People's Majlis" />
            </div>
            <div>
              <label style={labelStyle}>{t.deadline}</label>
              <input type="date" style={inputStyle} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.template}</label>
              <select style={inputStyle} value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
                <option value="">—</option>
                {templates.map((tp) => <option key={tp.id} value={tp.id}>{tp.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>{t.assignNow}</label>
              <select style={inputStyle} value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                <option value="">{t.later}</option>
                {transcribers.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{ borderTop: "1px dashed #CBD5D1", margin: "20px 0 14px", paddingTop: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#0E3B3A", marginBottom: 12 }}>
              ⚖ {t.courtSection}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>{t.caseNoLabel}</label>
                <input style={inputStyle} dir="ltr" value={caseNo} onChange={(e) => setCaseNo(e.target.value)} placeholder="123/Cr-C/2026" />
              </div>
              <div>
                <label style={labelStyle} className="tos-thaana">{CASE_LABELS.name}</label>
                <input style={{ ...inputStyle, fontSize: 16 }} className="tos-thaana" value={pName} onChange={(e) => setPName(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle} className="tos-thaana">{CASE_LABELS.lawyerFullName}</label>
                <input style={{ ...inputStyle, fontSize: 16 }} className="tos-thaana" value={pLawyer} onChange={(e) => setPLawyer(e.target.value)} placeholder="އަޙްމަދު އަޙްމަދު" />
              </div>
              <div>
                <label style={labelStyle} className="tos-thaana">{CASE_LABELS.position}</label>
                <input style={{ ...inputStyle, fontSize: 16 }} className="tos-thaana" value={pPosition} onChange={(e) => setPPosition(e.target.value)} />
              </div>
            </div>
          </div>

          <button className="tos-btn" onClick={createJob}
            style={{ background: "#0F766E", color: "#fff", marginTop: 20, padding: "11px 22px", fontSize: 14 }}>
            {t.createJob}
          </button>
        </div>
      )}

      {/* ---------- TEMPLATES (Zoho-style gallery) ---------- */}
      {tab === "templates" && (
        <div style={{ display: "grid", gap: 16 }}>
          <div className="tos-card" style={{ padding: "16px 20px", background: "#EFF6FF", borderColor: "#BFDBFE" }}>
            <div style={{ fontWeight: 800, fontSize: 13.5, color: "#1D4ED8", marginBottom: 6 }}>
              ⌘ {t.placeholders}
            </div>
            <div style={{ fontSize: 12.5, color: "#3B5876", marginBottom: 10, lineHeight: 1.5 }}>
              {t.placeholdersHint}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PLACEHOLDERS.map(([cmd, desc]) => (
                <button key={cmd} title={desc} onClick={() => copyCmd(cmd)}
                  style={{
                    background: "#fff", border: "1px solid #BFDBFE", borderRadius: 8,
                    padding: "4px 10px", color: "#1D4ED8", fontWeight: 700, fontSize: 12.5,
                    cursor: "pointer", direction: "ltr", fontFamily: "Consolas, monospace",
                  }}>
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* gallery */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
            {templates.map((tp) => {
              const previewHtml = buildExportHtml(SAMPLE_JOB, tp, "Aishath Reema", {
                source: t.source, deadline: t.deadline, template: t.template,
              });
              return (
                <div key={tp.id} className="tos-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column", borderColor: tp.isDefault ? "#0F766E" : undefined, boxShadow: tp.isDefault ? "0 0 0 2px rgba(15,118,110,0.18)" : undefined }}>
                  <div style={{ position: "relative", height: 170, background: "#fff", borderBottom: "1px solid #E2E8E6", cursor: "pointer" }}
                    onClick={() => setPreviewTp(tp)}>
                    <iframe title={tp.name} srcDoc={previewHtml} tabIndex={-1}
                      style={{
                        width: "250%", height: "250%", border: "none",
                        transform: "scale(0.4)", transformOrigin: "top left",
                        pointerEvents: "none", background: "#fff",
                      }} />
                    <div style={{ position: "absolute", inset: 0 }} />
                    {tp.isDefault && (
                      <span style={{ position: "absolute", top: 8, insetInlineStart: 8, background: "#0F766E", color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "3px 9px", borderRadius: 999, letterSpacing: 0.4, textTransform: "uppercase" }}>
                        ★ {t.defaultLabel}
                      </span>
                    )}
                    {tp.docxHtml && (
                      <span style={{ position: "absolute", top: 8, insetInlineEnd: 8, background: "#EFF6FF", color: "#1D4ED8", fontSize: 10.5, fontWeight: 800, padding: "3px 9px", borderRadius: 999 }}>
                        📄 .docx
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "#0E3B3A" }}>{tp.name}</div>
                    <div style={{ fontSize: 12, color: "#5B6B6E", lineHeight: 1.5, flex: 1 }}>{tp.desc}</div>
                    {tp.docxName && (
                      <div style={{ fontSize: 11.5, color: "#1D4ED8", fontWeight: 700 }}>📄 {tp.docxName}</div>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                      <button className="tos-btn" style={{ background: "#0F766E", color: "#fff", padding: "5px 10px", fontSize: 12 }}
                        onClick={() => setEditTp(tp)}>
                        ✎ {t.editTemplate}
                      </button>
                      <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A", padding: "5px 10px", fontSize: 12 }}
                        onClick={() => setPreviewTp(tp)}>
                        👁 {t.preview}
                      </button>
                      {!tp.isDefault && (
                        <button className="tos-btn" style={{ background: "#fff", color: "#0F766E", border: "1px solid #99F6E4", padding: "5px 10px", fontSize: 12 }}
                          onClick={() => setTemplates((ts) => ts.map((x) => ({ ...x, isDefault: x.id === tp.id })))}>
                          ★ {t.setDefault}
                        </button>
                      )}
                      <button className="tos-btn" style={{ background: "#fff", color: "#475569", border: "1px solid #E2E8E6", padding: "5px 10px", fontSize: 12 }}
                        onClick={() => setTemplates((ts) => [...ts, { ...tp, id: `tp${Date.now()}`, name: `${tp.name} (copy)`, isDefault: false }])}>
                        ⧉ {t.clone}
                      </button>
                      <label className="tos-btn" style={{ background: "#fff", color: "#1D4ED8", border: "1px solid #BFDBFE", padding: "5px 10px", fontSize: 12, cursor: "pointer" }}>
                        📄 {tp.docxName ? t.replaceDocx : ".docx"}
                        <input type="file" accept=".docx,.doc" style={{ display: "none" }}
                          onChange={(e) => attachDocx(tp.id, e.target.files?.[0])} />
                      </label>
                      {tp.docxUrl && (
                        <a href={tp.docxUrl} download={tp.docxName} className="tos-btn"
                          style={{ background: "#fff", color: "#0F766E", border: "1px solid #99F6E4", padding: "5px 10px", fontSize: 12, textDecoration: "none" }}>
                          ⬇
                        </a>
                      )}
                      <button className="tos-btn" style={{ background: "#fff", color: "#C2410C", border: "1px solid #FDBA74", padding: "5px 10px", fontSize: 12 }}
                        onClick={() => setTemplates((ts) => ts.filter((x) => x.id !== tp.id))}>
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* add-new card */}
            <div className="tos-card" style={{ padding: 18, background: "#F6FAF9", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#0E3B3A" }}>+ {t.addTemplate}</div>
              <div>
                <label style={labelStyle}>{t.templateName}</label>
                <input style={inputStyle} value={tpName} onChange={(e) => setTpName(e.target.value)} placeholder="Court hearing — verbatim" />
              </div>
              <div>
                <label style={labelStyle}>{t.templateDesc}</label>
                <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={tpDesc} onChange={(e) => setTpDesc(e.target.value)}
                  placeholder="Header fields, speaker label rules, timestamp frequency…" />
              </div>
              <label style={{
                display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
                border: "1px dashed " + (tpFile ? "#0F766E" : "#93C5FD"), borderRadius: 9,
                padding: "8px 14px", fontSize: 13, fontWeight: 700, alignSelf: "start",
                color: tpFile ? "#0F766E" : "#1D4ED8", background: tpFile ? "#F0FDFA" : "#fff",
              }}>
                <input type="file" accept=".docx,.doc" style={{ display: "none" }}
                  onChange={(e) => setTpFile(e.target.files?.[0] || null)} />
                📄 {tpFile ? tpFile.name : t.attachDocx}
              </label>
              <button className="tos-btn" onClick={addTemplate} style={{ background: "#0F766E", color: "#fff", alignSelf: "start" }}>
                {t.addTemplate}
              </button>
            </div>
          </div>

          {/* preview modal */}
          {previewTp && (
            <div onClick={() => setPreviewTp(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(14,27,28,0.55)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
              <div onClick={(e) => e.stopPropagation()} className="tos-card"
                style={{ width: "min(860px, 96vw)", height: "min(640px, 90vh)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: "1px solid #E2E8E6" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#0E3B3A" }}>{previewTp.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{t.previewNote}</div>
                  </div>
                  <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A" }} onClick={() => setPreviewTp(null)}>
                    ✕ {t.close}
                  </button>
                </div>
                <iframe title="preview" style={{ flex: 1, border: "none", background: "#fff" }}
                  srcDoc={buildExportHtml(SAMPLE_JOB, previewTp, "Aishath Reema", {
                    source: t.source, deadline: t.deadline, template: t.template,
                  })} />
              </div>
            </div>
          )}

          {editTp && (
            <TemplateEditor
              t={t} tp={editTp}
              onClose={() => setEditTp(null)}
              onSave={(body) => {
                setTemplates((ts) => ts.map((x) => (x.id === editTp.id ? { ...x, body } : x)));
                setEditTp(null);
                showToast(t.templateSaved);
              }}
            />
          )}
        </div>
      )}

      {/* ---------- STAFF (accounts & roles) ---------- */}
      {tab === "staff" && (
        <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
          {team.map((u) => {
            const load = jobs.filter((j) => j.assignee === u.id && j.status !== "approved").length;
            const isSelf = currentUser && u.id === currentUser.id;
            return (
              <div key={u.id} className="tos-card" style={{ padding: "14px 20px", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <Avatar user={u} size={38} />
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 800, fontSize: 14.5 }}>
                    {u.name} {isSelf && <span style={{ fontSize: 11, color: "#0F766E" }}>(you)</span>}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#64748B" }}>
                    <span dir="ltr" style={{ fontFamily: "Consolas, monospace" }}>@{u.username}</span> · {t.workload}: {load}
                  </div>
                </div>
                <div style={{ display: "grid", gap: 6, minWidth: 210 }}>
                  <input
                    dir="ltr" type="email" value={u.email || ""}
                    placeholder="name@court.gov.mv"
                    onChange={(e) => setTeam((tm) => tm.map((x) => (x.id === u.id ? { ...x, email: e.target.value } : x)))}
                    style={{ ...inputStyle, padding: "5px 9px", fontSize: 12.5 }}
                    aria-label={t.email}
                  />
                  <input
                    dir="ltr" type="tel" value={u.phone || ""}
                    placeholder="+960 7XXXXXX"
                    onChange={(e) => setTeam((tm) => tm.map((x) => (x.id === u.id ? { ...x, phone: e.target.value } : x)))}
                    style={{ ...inputStyle, padding: "5px 9px", fontSize: 12.5 }}
                    aria-label={t.phone}
                  />
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "6px 10px", border: "1px solid #E2E8E6", borderRadius: 9, background: "#FBFDFC" }}>
                  {["admin", "transcriber", "reviewer"].map((r) => (
                    <label key={r} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700, color: u.roles.includes(r) ? "#0F766E" : "#64748B", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={u.roles.includes(r)}
                        onChange={() => toggleRole(u, r)}
                      />
                      {t[r]}
                    </label>
                  ))}
                </div>
                <button className="tos-btn" style={{ background: "#fff", color: "#0F766E", border: "1px solid #99F6E4" }}
                  onClick={() => {
                    const p = window.prompt(t.resetPassword + " — " + u.name);
                    if (p) { setTeam((tm) => tm.map((x) => (x.id === u.id ? { ...x, password: p } : x))); showToast(t.passwordSet); }
                  }}>
                  🔑 {t.resetPassword}
                </button>
                <button className="tos-btn" style={{ background: "#fff", color: "#C2410C", border: "1px solid #FDBA74" }}
                  onClick={() => { if (!isSelf) removeStaff(u.id); }}>
                  {t.remove}
                </button>
              </div>
            );
          })}
          <div className="tos-card" style={{ padding: 20, background: "#F6FAF9" }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "#0E3B3A" }}>+ {t.addStaffMember}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>{t.fullName}</label>
                <input style={inputStyle} value={stName} onChange={(e) => setStName(e.target.value)} placeholder="Hawwa Niuma" />
              </div>
              <div>
                <label style={labelStyle}>{t.rolesLabel}</label>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "9px 12px", border: "1px solid #CBD5D1", borderRadius: 9, background: "#fff" }}>
                  {["transcriber", "reviewer", "admin"].map((r) => (
                    <label key={r} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700, color: stRoles.includes(r) ? "#0F766E" : "#64748B", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={stRoles.includes(r)}
                        onChange={() =>
                          setStRoles((rs) => (rs.includes(r) ? rs.filter((x) => x !== r) : [...rs, r]))
                        }
                      />
                      {t[r]}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>{t.username}</label>
                <input dir="ltr" style={inputStyle} value={stUsername} onChange={(e) => setStUsername(e.target.value)} placeholder="hawwa" autoCapitalize="none" />
              </div>
              <div>
                <label style={labelStyle}>{t.password}</label>
                <input dir="ltr" style={inputStyle} value={stPassword} onChange={(e) => setStPassword(e.target.value)} placeholder="••••••" />
              </div>
              <div>
                <label style={labelStyle}>{t.email}</label>
                <input dir="ltr" type="email" style={inputStyle} value={stEmail} onChange={(e) => setStEmail(e.target.value)} placeholder="hawwa@court.gov.mv" autoCapitalize="none" />
              </div>
              <div>
                <label style={labelStyle}>{t.phone}</label>
                <input dir="ltr" type="tel" style={inputStyle} value={stPhone} onChange={(e) => setStPhone(e.target.value)} placeholder="+960 7XXXXXX" />
              </div>
              <div>
                <label style={labelStyle}>{t.idNumber}</label>
                <input dir="ltr" style={inputStyle} value={stIdNo} onChange={(e) => setStIdNo(e.target.value)} placeholder="A000000" />
              </div>
              <div>
                <label style={labelStyle}>{t.jinNumber}</label>
                <input dir="ltr" style={inputStyle} value={stJin} onChange={(e) => setStJin(e.target.value)} placeholder="JIN…" />
              </div>
              <div>
                <label style={labelStyle}>{t.jobTitle}</label>
                <input className="tos-thaana" style={{ ...inputStyle, fontSize: 16 }} value={stJobTitle} onChange={(e) => setStJobTitle(e.target.value)} placeholder="އެޑްމިނިސްޓްރޭޓިވް އޮފިސަރ" />
              </div>
              <div>
                <label style={labelStyle}>{t.presentAddress}</label>
                <input className="tos-thaana" style={{ ...inputStyle, fontSize: 16 }} value={stPresentAddr} onChange={(e) => setStPresentAddr(e.target.value)} placeholder="މާލެ / ތީމުގެ" />
              </div>
              <div>
                <label style={labelStyle}>{t.permanentAddress}</label>
                <input className="tos-thaana" style={{ ...inputStyle, fontSize: 16 }} value={stPermAddr} onChange={(e) => setStPermAddr(e.target.value)} placeholder="މާލެ / ތީމުގެ" />
              </div>
              <div>
                <label style={labelStyle}>{t.bankName}</label>
                <input dir="ltr" style={inputStyle} value={stBank} onChange={(e) => setStBank(e.target.value)} placeholder="Bank of Maldives" />
              </div>
              <div>
                <label style={labelStyle}>{t.accountNo}</label>
                <input dir="ltr" style={inputStyle} value={stAccNo} onChange={(e) => setStAccNo(e.target.value)} placeholder="7730000000000" />
              </div>
              <div>
                <label style={labelStyle}>{t.accountName}</label>
                <input dir="ltr" style={inputStyle} value={stAccName} onChange={(e) => setStAccName(e.target.value)} placeholder="FULL NAME" />
              </div>
            </div>
            <button className="tos-btn" onClick={addStaff} style={{ background: "#0F766E", color: "#fff", marginTop: 14 }}>
              + {t.addStaffMember}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- VoiceOS panel (embedded TTS) ---------- */
function VoicePanel({ t, dv }) {
  const [text, setText] = useState("Good morning. The committee hearing will begin at nine o'clock.");
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [status, setStatus] = useState("ready");
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const thaana = /[\u0780-\u07BF]/.test(text);

  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        setVoiceURI((cur) => cur || (v.find((x) => x.default) || v[0]).voiceURI);
      }
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const speak = () => {
    if (!supported || !text.trim()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.voiceURI === voiceURI);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = pitch;
    u.onend = () => setStatus("ready");
    u.onerror = () => setStatus("ready");
    window.speechSynthesis.speak(u);
    setStatus("speaking");
  };

  const slider = (label, value, set, min, max) => (
    <div style={{ flex: 1, minWidth: 140 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 700, color: "#3E5255", marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: "#0F766E", fontVariantNumeric: "tabular-nums" }}>{value.toFixed(2)}</span>
      </div>
      <input type="range" min={min} max={max} step={0.05} value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#0F766E" }} />
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 720 }}>
      <div className="tos-card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#0E3B3A", marginBottom: 10 }}>
          🔊 Voice<span style={{ color: "#0F766E" }}>OS</span>
        </div>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: "#3E5255", display: "block", marginBottom: 5 }}>
          {t.ttsText}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className={thaana ? "tos-thaana" : ""}
          dir={thaana ? "rtl" : "ltr"}
          style={{
            width: "100%", boxSizing: "border-box", border: "1px solid #E2E8E6",
            borderRadius: 10, padding: "12px 14px", resize: "vertical",
            fontSize: thaana ? 18 : 14.5, lineHeight: 1.9, background: "#FBFDFC",
          }}
        />
        {thaana && (
          <div style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.6, color: "#9A3412", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 9, padding: "9px 12px" }}>
            ⚠ {t.ttsDvWarn}
          </div>
        )}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#3E5255", marginBottom: 4 }}>{t.ttsVoice}</div>
            <select
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              style={{ width: "100%", border: "1px solid #CBD5D1", borderRadius: 9, padding: "9px 12px", fontSize: 13, background: "#fff" }}
            >
              {voices.length === 0 ? (
                <option>{t.ttsNoVoices}</option>
              ) : (
                voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))
              )}
            </select>
          </div>
          {slider(t.ttsRate, rate, setRate, 0.5, 2)}
          {slider(t.ttsPitch, pitch, setPitch, 0, 2)}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <button className="tos-btn" disabled={!supported || !text.trim()}
            onClick={speak}
            style={{ background: "#0F766E", color: "#fff", padding: "11px 24px", fontSize: 14, opacity: !supported || !text.trim() ? 0.5 : 1 }}>
            ▶ {t.speakBtn}
          </button>
          {status === "speaking" && (
            <>
              <button className="tos-btn" onClick={() => { window.speechSynthesis.pause(); setStatus("paused"); }}
                style={{ background: "#EEF4F3", color: "#0E3B3A" }}>
                ❚❚ {t.pauseBtn}
              </button>
              <button className="tos-btn" onClick={() => { window.speechSynthesis.cancel(); setStatus("ready"); }}
                style={{ background: "#fff", color: "#C2410C", border: "1px solid #FDBA74" }}>
                ■ {t.stopBtn}
              </button>
            </>
          )}
          {status === "paused" && (
            <button className="tos-btn" onClick={() => { window.speechSynthesis.resume(); setStatus("speaking"); }}
              style={{ background: "#EEF4F3", color: "#0E3B3A" }}>
              ▶ {t.resumeBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Template editor (in-app, with command insertion) ---------- */
function TemplateEditor({ t, tp, onClose, onSave }) {
  const [body, setBody] = useState(tp.body || MAHSARU_BODY);
  const taRef = useRef(null);

  const insert = (cmd) => {
    const ta = taRef.current;
    if (!ta) { setBody((b) => b + cmd); return; }
    const start = ta.selectionStart ?? body.length;
    const end = ta.selectionEnd ?? start;
    const next = body.slice(0, start) + cmd + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + cmd.length;
    });
  };

  const previewHtml = buildExportHtml(SAMPLE_JOB, { ...tp, body, docxHtml: null }, "Aishath Reema", {
    source: t.source, deadline: t.deadline, template: t.template,
  });

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(14,27,28,0.6)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="tos-card"
        style={{ width: "min(1180px, 97vw)", height: "min(740px, 94vh)", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: "1px solid #E2E8E6" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0E3B3A" }}>✎ {tp.name}</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>{t.insertCmd}</div>
          </div>
          <button className="tos-btn" style={{ background: "#0F766E", color: "#fff" }} onClick={() => onSave(body)}>
            ✓ {t.save}
          </button>
          <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A" }} onClick={onClose}>
            {t.cancel}
          </button>
        </div>

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)", minHeight: 0 }}>
          {/* left: commands + body */}
          <div style={{ display: "flex", flexDirection: "column", borderInlineEnd: "1px solid #E2E8E6", minHeight: 0 }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid #EEF2F1", overflowY: "auto", maxHeight: 190 }}>
              {PLACEHOLDER_GROUPS.map(([group, cmds]) => (
                <div key={group} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: "#64748B", letterSpacing: 0.5, marginBottom: 4 }}>
                    {group}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {cmds.map(([cmd, desc]) => (
                      <button
                        key={cmd}
                        title={desc}
                        onClick={() => insert(cmd)}
                        style={{
                          background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 7,
                          padding: "3px 9px", color: "#1D4ED8", fontWeight: 700, fontSize: 11.5,
                          cursor: "pointer", direction: "ltr", fontFamily: "Consolas, monospace",
                        }}
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "10px 14px 4px", fontSize: 12.5, fontWeight: 700, color: "#3E5255" }}>
              {t.templateBody}
            </div>
            <textarea
              ref={taRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              dir="rtl"
              className="tos-thaana"
              spellCheck={false}
              style={{
                flex: 1, margin: "4px 14px 14px", border: "1px solid #E2E8E6", borderRadius: 10,
                padding: "12px 14px", fontSize: 15.5, lineHeight: 2.0, resize: "none",
                background: "#FBFDFC", minHeight: 0,
              }}
            />
          </div>

          {/* right: live preview */}
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0, background: "#F2F5F4" }}>
            <div style={{ padding: "10px 14px 4px", fontSize: 12.5, fontWeight: 700, color: "#3E5255" }}>
              👁 {t.livePreview}
            </div>
            <iframe
              title="template-preview"
              srcDoc={previewHtml}
              style={{ flex: 1, border: "1px solid #E2E8E6", borderRadius: 10, margin: "4px 14px 14px", background: "#fff", minHeight: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Profile (with signature capture) ---------- */
function Profile({ t, dv, currentUser, onSaveSig }) {
  const [sig, setSig] = useState(currentUser.signature || null);
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  const start = (e) => {
    drawing.current = true;
    const c = canvasRef.current, r = c.getBoundingClientRect();
    const ctx = c.getContext("2d");
    ctx.strokeStyle = "#101828"; ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath();
    const p = e.touches ? e.touches[0] : e;
    ctx.moveTo(p.clientX - r.left, p.clientY - r.top);
  };
  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const c = canvasRef.current, r = c.getBoundingClientRect();
    const ctx = c.getContext("2d");
    const p = e.touches ? e.touches[0] : e;
    ctx.lineTo(p.clientX - r.left, p.clientY - r.top);
    ctx.stroke();
  };
  const end = () => { drawing.current = false; };
  const clearCanvas = () => {
    const c = canvasRef.current;
    c.getContext("2d").clearRect(0, 0, c.width, c.height);
  };
  const saveDrawn = () => {
    const data = canvasRef.current.toDataURL("image/png");
    setSig(data); onSaveSig(data);
  };
  const onUpload = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => { setSig(r.result); onSaveSig(r.result); };
    r.readAsDataURL(file);
  };

  const row = (label, value) => (
    <div style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #EEF2F1" }}>
      <span style={{ fontSize: 13, color: "#64748B", width: 130 }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 600 }}>{value || "—"}</span>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 620 }}>
      <div className="tos-card" style={{ padding: 22, display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar user={currentUser} size={54} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{currentUser.name}</div>
          <div style={{ fontSize: 13, color: "#64748B" }}>{currentUser.roles.map((r) => t[r]).join(" · ")}</div>
        </div>
      </div>

      <div className="tos-card" style={{ padding: 22 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#0E3B3A", marginBottom: 10 }}>{t.myProfile}</div>
        {row("@", currentUser.username)}
        {row(t.email, currentUser.email)}
        {row(t.phone, currentUser.phone)}
        {row(t.idNumber, currentUser.idNo)}
        {row(t.jinNumber, currentUser.jin)}
        {row(t.jobTitle, currentUser.jobTitle)}
        {row(t.presentAddress, currentUser.presentAddress)}
        {row(t.permanentAddress, currentUser.permanentAddress)}
        {row(t.bankName, currentUser.bankName)}
        {row(t.accountNo, currentUser.accountNo)}
        {row(t.accountName, currentUser.accountName)}
      </div>

      <div className="tos-card" style={{ padding: 22 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#0E3B3A", marginBottom: 4 }}>{t.signature}</div>
        {sig ? (
          <div style={{ margin: "10px 0" }}>
            <img src={sig} alt="signature" style={{ maxHeight: 90, maxWidth: "100%", border: "1px solid #E2E8E6", borderRadius: 8, background: "#fff", padding: 6 }} />
          </div>
        ) : (
          <div style={{ fontSize: 13, color: "#94A3B8", margin: "8px 0" }}>{t.noSig}</div>
        )}

        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", border: "1px dashed #CBD5D1", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 700, color: "#0E3B3A", marginBottom: 14 }}>
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => onUpload(e.target.files?.[0])} />
          🖼 {t.uploadSignature}
        </label>

        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#3E5255", marginBottom: 6 }}>{t.drawSignature}</div>
        <canvas
          ref={canvasRef}
          width={520}
          height={150}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ width: "100%", maxWidth: 520, height: 150, border: "1px solid #CBD5D1", borderRadius: 10, background: "#fff", touchAction: "none", cursor: "crosshair" }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button className="tos-btn" style={{ background: "#0F766E", color: "#fff" }} onClick={saveDrawn}>
            ✓ {t.saveSig}
          </button>
          <button className="tos-btn" style={{ background: "#fff", color: "#64748B", border: "1px solid #E2E8E6" }} onClick={clearCanvas}>
            {t.clearSig}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Payment form (Jadhuvalu 4) ---------- */
function PaymentFormModal({ t, data, onClose }) {
  const th = "font-family:Faruma,'MV Faseyha','Noto Sans Thaana';";
  const sigImg = (src) =>
    src ? `<img src="${src}" style="max-height:46px;max-width:150px;" />` : "&nbsp;";

  const html = `<html><head><meta charset="utf-8"><style>
    body{font-family:Calibri,sans-serif;margin:1.4cm;color:#111;}
    .ctr{text-align:center;${th}}
    h1{font-size:13pt;margin:0;${th}}
    table{border-collapse:collapse;width:100%;margin-top:8pt;font-size:9pt;}
    td,th{border:1px solid #999;padding:5pt 6pt;text-align:center;${th}}
    .rtl{direction:rtl;text-align:right;${th}}
    .lbl{font-weight:bold;${th}}
    .hash{font-family:Consolas,monospace;font-size:7.5pt;color:#555;word-break:break-all;direction:ltr;}
  </style></head><body>
    <div class="ctr"><h1>${data.courtName}</h1><div style="${th}font-size:9pt;">މާލެ، ދިވެހިރާއްޖެ</div></div>
    <p class="rtl lbl" style="text-decoration:underline;margin-top:10pt;">ޖުޑީޝަރީގެ ޓައިޕިންގ ޕޫލްގެ ދަށުން ކޮށްފައިވާ މަސައްކަތަށް ފައިސާދޭނެ ގޮތުގެ ތަފްސީލް</p>
    <p class="rtl">1. މަސައްކަތް ހަވާލުކުރި ކޯޓު: ${data.courtName}</p>
    <p class="rtl">2. ސެކްޝަން: ${data.section}</p>
    <p class="rtl">3. މަސައްކަތްކުރި މުވައްޒަފު: ${data.transcriberName}</p>
    <p class="rtl lbl">4. ހަވާލުކުރެވުނު މަސައްކަތުގެ ތަފްސީލް:</p>
    <table>
      <tr>
        <th>ފައިސާދޭ ޞަފުހާ</th><th>ޓައިޕްކުރި ޞަފުހާ</th><th>ނިންމި ގަޑި</th><th>ފެށި ގަޑި</th>
        <th>ނިންމި ތާރީޚު</th><th>ހަވާލުކުރި ތާރީޚު</th><th>ރެކޯޑިންގ ދިގުމިން</th><th>ޤަޟިއްޔާ ނަންބަރު</th>
      </tr>
      <tr>
        <td>${data.pagesPayable}</td><td>${data.pagesTyped}</td><td>${data.endTime}</td><td>${data.startTime}</td>
        <td>${data.completedDate}</td><td>${data.assignedDate}</td><td>${data.recDuration}</td><td>${data.caseNo}</td>
      </tr>
    </table>
    <p class="rtl lbl" style="margin-top:10pt;">5. ފައިސާ ޖަމާކުރަންޖެހޭ އެކައުންޓް:</p>
    <table>
      <tr><th>އެކައުންޓް ނަންބަރު</th><th>އެކައުންޓުގެ ނަން</th><th>ބޭންކް</th></tr>
      <tr><td>${data.accountNo}</td><td>${data.accountName}</td><td>${data.bankName}</td></tr>
    </table>
    <p class="rtl lbl" style="margin-top:10pt;">6. ޗެކްކޮށް ފާސްކުރި މުވައްޒަފު:</p>
    <table>
      <tr>
        <td style="width:33%;">${sigImg(data.transcriberSig)}<div style="${th}font-size:8pt;">${t.typedByLabel}<br>${data.transcriberName}</div></td>
        <td style="width:33%;">${sigImg(data.supervisorSig)}<div style="${th}font-size:8pt;">${t.checkedByLabel}<br>${data.supervisorName} · ${data.supervisorPosition}</div></td>
        <td class="rtl" style="font-size:8pt;">ތާރީޚު: ${data.approvedDate}</td>
      </tr>
    </table>
    <p style="margin-top:14pt;font-size:8pt;"><b>${t.verifyHash}:</b></p>
    <p class="hash">${data.hash}</p>
    <p style="font-size:7.5pt;color:#777;${th}direction:rtl;text-align:right;">🔒 ${t.signedBy} — SHA-256</p>
  </body></html>`;

  const download = () => {
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${data.caseNo.replace(/[^\w]/g, "_")}-payment.doc`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(14,27,28,0.6)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} className="tos-card" style={{ width: "min(900px,97vw)", height: "min(720px,94vh)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: "1px solid #E2E8E6" }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#0E3B3A", flex: 1 }}>📄 {t.paymentForm}</div>
          <button className="tos-btn" style={{ background: "#1D4ED8", color: "#fff" }} onClick={download}>⬇ {t.downloadForm}</button>
          <button className="tos-btn" style={{ background: "#EEF4F3", color: "#0E3B3A" }} onClick={onClose}>✕</button>
        </div>
        <iframe title="payment-form" srcDoc={html} style={{ flex: 1, border: "none", background: "#fff" }} />
      </div>
    </div>
  );
}
