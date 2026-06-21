/* global React, Section, SubHead, SubNote, Example, Icon, Btn, Badge */

function PatternsSection() {
  return (
    <Section
      id="patterns"
      eyebrow="Composition"
      title="Patterns"
      lead="Higher-order compositions the product reuses on nearly every page. They live in @/components (not /ui) and assemble primitives into consistent page furniture."
    >
      {/* PAGE HEADER */}
      <SubHead>Page header</SubHead>
      <SubNote>Title + description on the left, actions on the right; stacks under 640px. <code>PageHeader.tsx</code>.</SubNote>
      <Example block
        code={`<PageHeader
  title="Agents"
  description="Autonomous workers running in your workspace."
  actions={<Button><Plus /> New agent</Button>}
/>`}
      >
        <div className="sh-pageheader" style={{ width: "100%", paddingBottom: 0 }}>
          <div>
            <h1 className="sh-pageheader__title">Agents</h1>
            <p className="sh-pageheader__desc">Autonomous workers running in your workspace.</p>
          </div>
          <div className="sh-pageheader__actions">
            <Btn variant="outline">Import</Btn>
            <Btn variant="brand"><Icon name="plus" /> New agent</Btn>
          </div>
        </div>
      </Example>

      {/* FORM */}
      <SubHead>Form layout</SubHead>
      <SubNote>Label → control → helper, stacked with <code>space-y-2</code>; grouped fields in a Card. Footer actions right-aligned, primary last.</SubNote>
      <Example center
        code={`<Card>
  <CardHeader><CardTitle>New agent</CardTitle></CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label>Name</Label><Input />
    </div>
    …
  </CardContent>
  <CardFooter>…</CardFooter>
</Card>`}
      >
        <div className="sh-card" style={{ width: 420 }}>
          <div className="sh-card__header">
            <div className="sh-card__title" style={{ fontSize: "1.05rem" }}>New agent</div>
            <div className="sh-card__desc">Configure a worker and connect its triggers.</div>
          </div>
          <div className="sh-card__content">
            <div className="col" style={{ gap: 14 }}>
              <div className="col" style={{ gap: 6 }}>
                <label className="sh-label">Name</label>
                <input className="sh-input" defaultValue="Triage bot" />
              </div>
              <div className="col" style={{ gap: 6 }}>
                <label className="sh-label">Instructions</label>
                <textarea className="sh-input sh-textarea" defaultValue="Label and route incoming issues by severity." />
              </div>
              <label className="row" style={{ gap: 9 }}>
                <span className="sh-check" data-checked role="checkbox" aria-checked="true"><Icon name="check" size={14} stroke={3} /></span>
                <span className="sh-label">Notify me when a run completes</span>
              </label>
            </div>
          </div>
          <div className="sh-card__footer" style={{ justifyContent: "flex-end" }}>
            <Btn variant="ghost">Cancel</Btn>
            <Btn variant="brand">Create agent</Btn>
          </div>
        </div>
      </Example>

      {/* DATA TABLE */}
      <SubHead>Data table</SubHead>
      <SubNote>Toolbar (search + filters) above a bordered Table, with row-level status and actions. <code>DataTable.tsx</code>.</SubNote>
      <Example block
        code={`<DataTable columns={agentsColumns} data={agents}
  toolbar={<Input placeholder="Search…" />} />`}
      >
        <div className="col" style={{ gap: 12, width: "100%" }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div style={{ position: "relative", maxWidth: 260, width: "100%" }}>
              <Icon name="search" size={15} style={{ position: "absolute", left: 11, top: 12, color: "var(--muted-foreground)" }} />
              <input className="sh-input" placeholder="Search agents…" style={{ paddingLeft: 34 }} />
            </div>
            <div className="row">
              <Btn variant="outline" size="sm"><Icon name="sliders" size={15} /> Filters</Btn>
              <Btn variant="brand" size="sm"><Icon name="plus" size={15} /> New</Btn>
            </div>
          </div>
          <div className="sh-table-wrap">
            <table className="sh-table">
              <thead>
                <tr><th>Agent</th><th>Owner</th><th>Status</th><th>Last run</th><th style={{ textAlign: "right" }}>Runs</th></tr>
              </thead>
              <tbody>
                <tr><td style={{ fontWeight: 500 }}>Triage bot</td><td>S. Ahmed</td><td><Badge variant="success">Active</Badge></td><td>2m ago</td><td style={{ textAlign: "right" }}>1,284</td></tr>
                <tr><td style={{ fontWeight: 500 }}>Release notes</td><td>J. Kim</td><td><Badge variant="warning">Pending</Badge></td><td>1h ago</td><td style={{ textAlign: "right" }}>92</td></tr>
                <tr><td style={{ fontWeight: 500 }}>PR reviewer</td><td>M. Diaz</td><td><Badge variant="info">Running</Badge></td><td>just now</td><td style={{ textAlign: "right" }}>431</td></tr>
                <tr><td style={{ fontWeight: 500 }}>Changelog</td><td>S. Ahmed</td><td><Badge variant="neutral">Draft</Badge></td><td>—</td><td style={{ textAlign: "right" }}>0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Example>

      {/* EMPTY STATE */}
      <SubHead>Empty state</SubHead>
      <SubNote>Dashed container, muted circular icon, title, optional description and actions. <code>EmptyState.tsx</code>.</SubNote>
      <Example center
        code={`<EmptyState
  icon={Inbox}
  title="No agents yet"
  description="Create your first agent to get started."
  actions={<Button>New agent</Button>}
/>`}
      >
        <div className="sh-empty" style={{ width: "100%", maxWidth: 460 }}>
          <div className="sh-empty__icon"><Icon name="inbox" size={24} /></div>
          <div className="sh-empty__title">No agents yet</div>
          <div className="sh-empty__desc">Create your first agent to start automating work across your repos and tools.</div>
          <div className="sh-empty__actions">
            <Btn variant="brand"><Icon name="plus" size={15} /> New agent</Btn>
            <Btn variant="outline">Browse templates</Btn>
          </div>
        </div>
      </Example>
    </Section>
  );
}

function GuidelinesSection() {
  return (
    <Section
      id="guidelines"
      eyebrow="Practice"
      title="Usage guidelines"
      lead="The system stays coherent only if these hold. When in doubt, prefer the token and the existing primitive over a one-off."
    >
      <SubHead>Colour</SubHead>
      <div className="guides">
        <div className="guide guide--do">
          <div className="guide__head"><Icon name="check" size={16} stroke={2.5} /> Do</div>
          <ul>
            <li>Reference roles — <code>bg-primary</code>, <code>text-muted-foreground</code> — so dark mode and re-theming are free.</li>
            <li>Use status tones (success / warning / info / destructive) for state and meaning.</li>
            <li>Use the neutral <code>--primary</code> (black) for primary actions and brand emphasis.</li>
          </ul>
        </div>
        <div className="guide guide--dont">
          <div className="guide__head"><Icon name="x" size={16} stroke={2.5} /> Don't</div>
          <ul>
            <li>Hard-code hex or oklch literals in components — it breaks theming.</li>
            <li>Introduce accent hues or gradients — the brand is deliberately neutral black.</li>
            <li>Use new accent colours outside the documented chart palette for data viz.</li>
          </ul>
        </div>
      </div>

      <SubHead>Type & spacing</SubHead>
      <div className="guides">
        <div className="guide guide--do">
          <div className="guide__head"><Icon name="check" size={16} stroke={2.5} /> Do</div>
          <ul>
            <li>Build new (v2) UI on the system-ui sans stack.</li>
            <li>Stay on the 4px spacing grid and the four-step radius scale.</li>
            <li>Keep elevation to the three shadow steps; depth means layering.</li>
          </ul>
        </div>
        <div className="guide guide--dont">
          <div className="guide__head"><Icon name="x" size={16} stroke={2.5} /> Don't</div>
          <ul>
            <li>Bring Poppins into shadcn (v2) components — it's legacy v1 only.</li>
            <li>Invent off-grid paddings or arbitrary corner radii per component.</li>
            <li>Stack heavy custom shadows for decoration.</li>
          </ul>
        </div>
      </div>

      <SubHead>Components</SubHead>
      <div className="guides">
        <div className="guide guide--do">
          <div className="guide__head"><Icon name="check" size={16} stroke={2.5} /> Do</div>
          <ul>
            <li>Compose from <code>@/components/ui</code> primitives before writing new markup.</li>
            <li>Put one primary action per view; everything else is secondary / ghost / outline.</li>
            <li>Use Lucide at <code>size-4</code> (16px) inside buttons and inputs.</li>
          </ul>
        </div>
        <div className="guide guide--dont">
          <div className="guide__head"><Icon name="x" size={16} stroke={2.5} /> Don't</div>
          <ul>
            <li>Fork a primitive's styles inline when a variant already exists.</li>
            <li>Crowd a row with multiple primary (filled) buttons.</li>
            <li>Mix icon sets — the system is Lucide end to end.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { PatternsSection, GuidelinesSection });
