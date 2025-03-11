export namespace main {
	
	export class SessionEntry {
	    Type: number;
	    Version: string;
	    Name: string;
	    GenericName: string;
	    Comment: string;
	    Icon: string;
	    URL: string;
	    NoDisplay: boolean;
	    Hidden: boolean;
	    OnlyShowIn: string[];
	    NotShowIn: string[];
	    DBusActivatable: boolean;
	    TryExec: string;
	    Exec: string;
	    Path: string;
	    Terminal: boolean;
	    Actions: desktop.Action[];
	    MimeType: string[];
	    Categories: string[];
	    Implements: string[];
	    Keywords: string[];
	    StartupNotify: boolean;
	    StartupWMClass: string;
	    X: Record<string, any>;
	    Type: string;
	    SessionType: string;
	
	    static createFrom(source: any = {}) {
	        return new SessionEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Type = source["Type"];
	        this.Version = source["Version"];
	        this.Name = source["Name"];
	        this.GenericName = source["GenericName"];
	        this.Comment = source["Comment"];
	        this.Icon = source["Icon"];
	        this.URL = source["URL"];
	        this.NoDisplay = source["NoDisplay"];
	        this.Hidden = source["Hidden"];
	        this.OnlyShowIn = source["OnlyShowIn"];
	        this.NotShowIn = source["NotShowIn"];
	        this.DBusActivatable = source["DBusActivatable"];
	        this.TryExec = source["TryExec"];
	        this.Exec = source["Exec"];
	        this.Path = source["Path"];
	        this.Terminal = source["Terminal"];
	        this.Actions = this.convertValues(source["Actions"], desktop.Action);
	        this.MimeType = source["MimeType"];
	        this.Categories = source["Categories"];
	        this.Implements = source["Implements"];
	        this.Keywords = source["Keywords"];
	        this.StartupNotify = source["StartupNotify"];
	        this.StartupWMClass = source["StartupWMClass"];
	        this.X = source["X"];
	        this.Type = source["Type"];
	        this.SessionType = source["SessionType"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace user {
	
	export class User {
	    Uid: string;
	    Gid: string;
	    Username: string;
	    Name: string;
	    HomeDir: string;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Uid = source["Uid"];
	        this.Gid = source["Gid"];
	        this.Username = source["Username"];
	        this.Name = source["Name"];
	        this.HomeDir = source["HomeDir"];
	    }
	}

}

